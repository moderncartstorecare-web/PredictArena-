/* =================================================================
   CricPulse · supabase.js
   ================================================================= */

// Your Supabase credentials
const SUPABASE_URL = "https://sqldalrqohvhayfmbice.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_894UwPwZc0SF2MyCP9sztQ_6-s0AALZ";

// Initialize the Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.CP_DB = {
  client: supabase,
  ready: true,

  // --- AUTHENTICATION ---
  
  getUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? session.user : null;
  },

  signInGoogle: async () => {
    // Redirects the user to Google, then back to your current URL
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

  // --- DATA FETCHING ---
  
  getProfile: async (userId) => {
    const { data, error } = await supabase.from('users').select('*, wallet(*)').eq('id', userId).single();
    if (error) return null;
    
    // Format profile to match PredictArena frontend expectations
    return {
      display_name: data.full_name,
      email: data.email,
      balance: data.wallet?.[0]?.balance || 0,
      xp: data.wallet?.[0]?.xp || 0,
      streak: data.wallet?.[0]?.streak || 0,
      streak_best: data.wallet?.[0]?.streak_best || 0,
      referral_code: data.referral_code
    };
  },

  getTransactions: async (userId) => {
    const { data, error } = await supabase.from('transactions').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    return data || [];
  },

  getPredictions: async (userId) => {
    // If you use 'predictions' table, change this. Using 'match_history' based on your schema
    const { data, error } = await supabase.from('match_history').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    return data || [];
  },

  // --- WALLET ACTIONS ---
  
  deposit: async (amount, txnId) => {
    // Calls the RPC we created earlier to process ZapUPI payment safely
    const { data, error } = await supabase.rpc('process_deposit', { 
      p_amount: amount, 
      p_txn_id: txnId 
    });
    if (error) throw error;
    return data;
  },

  withdraw: async (amount, method, detail) => {
    // Uses the withdrawal RPC from your schema
    const { data, error } = await supabase.rpc('create_withdrawal_request', {
      p_upi_id: detail,
      p_amount: amount
    });
    if (error) throw error;
    return data;
  }
};
