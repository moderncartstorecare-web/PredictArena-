// config.js — CricPulse Core Database Integration
const SUPABASE_URL = "https://sqldalrqohvhayfmbice.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_894UwPwZc0SF2MyCP9sztQ_6-s0AALZ";

// Initialize Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.CP_DB = {
  client: supabase,
  authClient: supabase, // Alias for admin.html compatibility
  ready: true,

  // --- AUTHENTICATION ---
  getUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
  },

  signInGoogle: async () => {
    const redirectUrl = window.location.origin + window.location.pathname;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectUrl }
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
  },

  // --- FRONTEND DATA FETCHING ---
  getProfile: async (userId) => {
    const { data, error } = await supabase.from('users').select('*, wallet(*)').eq('id', userId).single();
    if (error) return null;
    
    // Format to match frontend expectations
    return {
      display_name: data.full_name || data.email?.split('@')[0],
      email: data.email,
      balance: data.wallet?.[0]?.balance || 0,
      xp: data.wallet?.[0]?.points || 0,
      streak: 0, 
      streak_best: 0
    };
  },

  getTransactions: async (userId) => {
    const { data } = await supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    return data || [];
  },

  getPredictions: async (userId) => {
    // Return empty array for now, since predictions table isn't built yet
    return [];
  },

  // --- MATCHES & NOTIFICATIONS ---
  getMatches: async () => {
    const { data } = await supabase.from('matches').select('*').order('created_at', { ascending: false });
    return data || [];
  },

  addMatch: async (match) => {
    const { data, error } = await supabase.from('matches').insert(match).select();
    if (error) throw error;
    return data;
  },

  updateMatch: async (id, patch) => {
    const { data, error } = await supabase.from('matches').update(patch).eq('id', id).select();
    if (error) throw error;
    return data;
  },

  getNotifications: async (userId) => {
    const { data } = await supabase.from('notifications').select('*').or(`user_id.eq.${userId},user_id.is.null`).order('created_at', { ascending: false });
    return data || [];
  },

  sendBroadcast: async (title, body) => {
    const { data, error } = await supabase.from('notifications').insert({ title, body, user_id: null }).select();
    if (error) throw error;
    return data;
  }
};
