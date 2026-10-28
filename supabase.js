(function () {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.CP_CONFIG;
  const headers = () => ({
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + (window.CP_SESSION?.access_token || SUPABASE_ANON_KEY),
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  });
  
  window.CP_DB = {
    ready: !!(SUPABASE_URL && !SUPABASE_URL.includes("YOUR-PROJECT")),
    rest: (path, opts = {}) => fetch(SUPABASE_URL + "/rest/v1/" + path, { ...opts, headers: { ...headers(), ...(opts.headers || {}) } })
      .then(async r => {
        const txt = await r.text();
        let data; try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
        if (!r.ok) throw new Error((data && data.message) || "Request failed");
        return data;
      }),
    auth: (path, body, method = "POST") => fetch(SUPABASE_URL + "/auth/v1/" + path, {
      method,
      headers: { "apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.msg || data.error_description || "Auth failed");
      return data;
    }),
    signIn: (email, password) => auth("token?grant_type=password", { email, password }),
    signUp: (email, password, meta) => auth("signup", { email, password, data: meta }),
    signInGoogle: async () => {
      const redirect = encodeURIComponent(location.origin + location.pathname);
      location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirect}`;
    },
    setSession: s => { window.CP_SESSION = s; try { localStorage.setItem("cp_session", JSON.stringify(s)); } catch {} },
    loadSession: () => {
      try { const s = JSON.parse(localStorage.getItem("cp_session") || "null"); if (s?.access_token) window.CP_SESSION = s; } catch {}
    }
  };
})();
