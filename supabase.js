// supabase.js — thin wrapper around supabase-js for CricPulse
// Exposes: DB.<method>(...) which returns Promises

const SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';

const _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DB = {
  // ---- auth ----
  signUp: (email, password, name) =>
    _sb.auth.signUp({
      email, password,
      options: { data: { display_name: name } }
    }),

  signIn: (email, password) =>
    _sb.auth.signInWithPassword({ email, password }),

  signInGoogle: () =>
    _sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    }),

  signOut: () => _sb.auth.signOut(),

  getUser: async () => {
    const { data: { user } } = await _sb.auth.getUser();
    return user;
  },

  onAuthChange: (cb) => _sb.auth.onAuthStateChange(cb),

  // ---- profile ----
  getProfile: async (uid) => {
    const { data, error } = await _sb.from('profiles').select('*').eq('id', uid).single();
    if (error) throw error;
    return data;
  },

  updateProfile: async (uid, patch) => {
    const { error } = await _sb.from('profiles').update(patch).eq('id', uid);
    if (error) throw error;
  },

  // ---- predictions ----
  getPredictions: async (uid) => {
    const { data, error } = await _sb.from('predictions')
      .select('*').eq('user_id', uid).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  placePrediction: async (marketId, pick, odds) => {
    const { data, error } = await _sb.rpc('place_prediction', {
      p_market_id: marketId, p_pick: pick, p_odds: odds
    });
    if (error) throw error;
    return data;
  },

  settlePrediction: async (predId, win) => {
    const { data, error } = await _sb.rpc('settle_prediction', {
      p_pred_id: predId, p_win: win
    });
    if (error) throw error;
    return data;
  },

  // ---- wallet ----
  getTransactions: async (uid) => {
    const { data, error } = await _sb.from('transactions')
      .select('*').eq('user_id', uid).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  deposit: async (amount) => {
    const { data, error } = await _sb.rpc('deposit_funds', { p_amount: amount });
    if (error) throw error;
    return data;
  },

  withdraw: async (amount, method, detail) => {
    const { data, error } = await _sb.rpc('request_withdraw', {
      p_amount: amount, p_method: method, p_detail: detail
    });
    if (error) throw error;
    return data;
  },

  // ---- coupons ----
  getCoupons: async (uid) => {
    const { data, error } = await _sb.from('coupons')
      .select('*').eq('user_id', uid).order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  claimCoupon: async (id) => {
    const { error } = await _sb.rpc('claim_coupon', { p_id: id });
    if (error) throw error;
  },

  // ---- notifications ----
  getNotifications: async (uid) => {
    const { data, error } = await _sb.from('notifications')
      .select('*').eq('user_id', uid).order('created_at', { ascending: false }).limit(50);
    if (error) throw error;
    return data || [];
  },

  markAllRead: async (uid) => {
    const { error } = await _sb.from('notifications')
      .update({ read: true }).eq('user_id', uid).eq('read', false);
    if (error) throw error;
  },

  // ---- leaderboard ----
  getLeaderboard: async (range) => {
    const { data, error } = await _sb.from('leaderboard_week').select('*');
    if (error) throw error;
    return data || [];
  }
};
