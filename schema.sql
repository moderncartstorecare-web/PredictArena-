-- ============================================================
-- CRICPULSE MASTER SCHEMA v1.0
-- ============================================================

-- 1. ADMINS TABLE (For security)
create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text default 'admin'
);
alter table public.admins enable row level security;
create policy "Admins can view admins" on public.admins for select using (auth.uid() in (select user_id from public.admins));

-- Helper function: Check if logged-in user is an admin
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- 2. USERS TABLE
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  city text,
  status text default 'active',
  kyc_verified boolean default false,
  wallet_balance integer default 0, -- Kept for admin panel compatibility
  created_at timestamptz default now()
);
alter table public.users enable row level security;
create policy "Users can view own profile" on public.users for select using (auth.uid() = id or public.is_admin());
create policy "Users can update own profile" on public.users for update using (auth.uid() = id or public.is_admin());

-- 3. WALLET TABLE
create table public.wallet (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade unique,
  balance integer default 0 check (balance >= 0),
  points integer default 0,
  updated_at timestamptz default now()
);
alter table public.wallet enable row level security;
create policy "Users can view own wallet" on public.wallet for select using (auth.uid() = user_id or public.is_admin());
create policy "Users can update own wallet" on public.wallet for update using (auth.uid() = user_id or public.is_admin());

-- 4. MATCHES TABLE
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  league text,
  team_a text not null,
  team_b text not null,
  closes_at timestamptz,
  crowd_a integer default 50,
  odds_a numeric default 1.85,
  odds_b numeric default 2.10,
  created_at timestamptz default now()
);
alter table public.matches enable row level security;
create policy "Anyone can view matches" on public.matches for select using (true);
create policy "Only admins can modify matches" on public.matches for all using (public.is_admin());

-- 5. NOTIFICATIONS TABLE
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  body text,
  icon text default 'bell',
  is_read boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;
create policy "Users view own or broadcast notifications" on public.notifications for select using (auth.uid() = user_id or user_id is null or public.is_admin());
create policy "Users update own notifications" on public.notifications for update using (auth.uid() = user_id);

-- 6. TRANSACTIONS TABLE
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  description text not null,
  type text check (type in ('credit', 'debit')),
  amount integer not null,
  status text default 'completed',
  created_at timestamptz default now()
);
alter table public.transactions enable row level security;
create policy "Users view own transactions" on public.transactions for select using (auth.uid() = user_id or public.is_admin());

-- 7. PREDICTIONS TABLE
create table public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  match_id uuid references public.matches(id) on delete cascade,
  prediction_choice text not null,
  amount integer default 0,
  status text default 'pending',
  created_at timestamptz default now()
);
alter table public.predictions enable row level security;
create policy "Users view own predictions" on public.predictions for select using (auth.uid() = user_id or public.is_admin());
create policy "Users insert own predictions" on public.predictions for insert with check (auth.uid() = user_id);

-- 8. WITHDRAWAL REQUESTS TABLE
create table public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  amount integer not null,
  method text not null,
  account text not null,
  status text default 'pending',
  created_at timestamptz default now()
);
alter table public.withdrawal_requests enable row level security;
create policy "Users view own withdrawals" on public.withdrawal_requests for select using (auth.uid() = user_id or public.is_admin());
create policy "Users insert own withdrawals" on public.withdrawal_requests for insert with check (auth.uid() = user_id);

-- 9. SUPPORT TICKETS
create table public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  subject text not null,
  status text default 'open',
  priority text default 'normal',
  created_at timestamptz default now()
);
alter table public.support_tickets enable row level security;
create policy "Users view own tickets" on public.support_tickets for select using (auth.uid() = user_id or public.is_admin());
create policy "Users insert own tickets" on public.support_tickets for insert with check (auth.uid() = user_id);

-- 10. TICKET MESSAGES
create table public.ticket_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid references public.support_tickets(id) on delete cascade,
  sender text not null,
  message text not null,
  created_at timestamptz default now()
);
alter table public.ticket_messages enable row level security;
create policy "Users view own ticket messages" on public.ticket_messages for select using (
  exists (select 1 from public.support_tickets t where t.id = ticket_id and (t.user_id = auth.uid() or public.is_admin()))
);
create policy "Users insert own ticket messages" on public.ticket_messages for insert with check (
  exists (select 1 from public.support_tickets t where t.id = ticket_id and (t.user_id = auth.uid() or public.is_admin()))
);

-- ============================================================
-- AUTO-PROVISION NEW USERS (Trigger)
-- ============================================================
create or replace function public.handle_new_user() returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, full_name) values (new.id, new.email, new.raw_user_meta_data->>'full_name') on conflict do nothing;
  insert into public.wallet (user_id, balance, points) values (new.id, 25, 0) on conflict do nothing;
  insert into public.transactions (user_id, description, type, amount) values (new.id, 'Welcome bonus', 'credit', 25);
  insert into public.notifications (user_id, title, body, icon) values (new.id, 'Welcome to CricPulse!', 'You received a ₹25 welcome bonus.', 'gift');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- ============================================================
-- SYNC WALLET BALANCE TO USERS TABLE (For Admin Panel)
-- ============================================================
create or replace function public.sync_wallet_balance() returns trigger language plpgsql security definer as $$
begin
  update public.users set wallet_balance = new.balance where id = new.user_id;
  return new;
end; $$;

drop trigger if exists on_wallet_update on public.wallet;
create trigger on_wallet_update after update on public.wallet for each row execute procedure public.sync_wallet_balance();

-- ============================================================
-- ADMIN FUNCTIONS (RPCs)
-- ============================================================

-- Admin Adjust Wallet
create or replace function public.admin_adjust_balance(p_user_id uuid, p_delta integer, p_reason text default 'Admin update')
returns json language plpgsql security definer as $$
declare v_new integer;
begin
  if not public.is_admin() then return json_build_object('ok', false, 'message', 'Forbidden'); end if;
  
  update public.wallet set balance = greatest(0, balance + p_delta), updated_at = now() where user_id = p_user_id returning balance into v_new;
  if v_new is null then return json_build_object('ok', false, 'message', 'User wallet not found'); end if;
  
  insert into public.transactions (user_id, description, type, amount) values (p_user_id, p_reason, case when p_delta > 0 then 'credit' else 'debit' end, abs(p_delta));
  return json_build_object('ok', true, 'new_balance', v_new);
end; $$;

-- Admin Send Notification
create or replace function public.admin_send_notification(p_title text, p_body text, p_user_id uuid default null, p_icon text default 'bell')
returns json language plpgsql security definer as $$
begin
  if not public.is_admin() then return json_build_object('ok', false, 'message', 'Forbidden'); end if;
  insert into public.notifications (user_id, title, body, icon) values (p_user_id, p_title, p_body, p_icon);
  return json_build_object('ok', true);
end; $$;

-- ============================================================
-- REGISTER ADMIN & ENABLE REALTIME
-- ============================================================
-- ⚠️ IMPORTANT: REPLACE 'YOUR-ADMIN-UUID-HERE' WITH YOUR ACTUAL SUPABASE USER ID
-- You can find your user ID in Supabase -> Authentication -> Users
/*
insert into public.admins (user_id, email, role) 
values ('YOUR-ADMIN-UUID-HERE', 'moderncartstore.care@gmail.com', 'super_admin')
on conflict (user_id) do nothing;
*/

-- ENABLE REAL-TIME (This makes everything update instantly)
alter publication supabase_realtime add table public.wallet;
alter publication supabase_realtime add table public.notifications;
alter publication supabase_realtime add table public.support_tickets;
alter publication supabase_realtime add table public.ticket_messages;
alter publication supabase_realtime add table public.transactions;
