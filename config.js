// config.js — loaded by both index.html and admin.html
// Replace placeholders with real credentials.
window.CP_CONFIG = {
  SUPABASE_URL: "https://hmiyhdekyqpzkxqiukvb.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_lexqjxd-jNUUvYVTnwawPw_EnBvlHjd",
  ZAPUPI_MERCHANT_ID: "zapce570e671e2f07f3bc9837566a44ec4c",
  ZAPUPI_ENDPOINT: "https://api.zapupi.com/v1/payments", // placeholder
  ADMIN_EMAILS: ["moderncartstore.care@gmail.com"], // fallback admin check client-side (real check via RLS)
  SUPPORT_REPLY_WINDOW: "60 minutes",
  INSTAGRAM_HANDLE: "cricpulse.official"
};

// Minimal Supabase REST wrapper (no npm, CDN-friendly)
(function () {
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.CP_CONFIG;
  const headers = () => ({
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": "Bearer " + (window.CP_SESSION?.access_token || SUPABASE_ANON_KEY),
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  });
  const rest = (path, opts = {}) =>
    fetch(SUPABASE_URL + "/rest/v1/" + path, { ...opts, headers: { ...headers(), ...(opts.headers || {}) } })
      .then(async r => {
        const txt = await r.text();
        let data; try { data = txt ? JSON.parse(txt) : null; } catch { data = txt; }
        if (!r.ok) throw new Error((data && (data.message || data.error)) || "Request failed (" + r.status + ")");
        return data;
      });
  const auth = (path, body, method = "POST") =>
    fetch(SUPABASE_URL + "/auth/v1/" + path, {
      method,
      headers: { "apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }).then(async r => {
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.msg || data.error_description || data.error || "Auth failed");
      return data;
    });

  window.CP_DB = {
    ready: !!(SUPABASE_URL && !SUPABASE_URL.includes("YOUR-PROJECT")),
    rest,
    auth,
    signUp: (email, password, meta) => auth("signup", { email, password, data: meta }),
    signIn: (email, password) => auth("token?grant_type=password", { email, password }),
    signInGoogle: async () => {
      // GitHub Pages callback → current page. Real Google OAuth must be configured in Supabase dashboard.
      const redirect = encodeURIComponent(location.href.split("#")[0]);
      location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirect}`;
    },
    getUser: () => rest("users?select=*").then(u => u && u[0]).catch(() => null),
    setSession: s => { window.CP_SESSION = s; try { localStorage.setItem("cp_session", JSON.stringify(s)); } catch {} },
    loadSession: () => {
      try {
        const s = JSON.parse(localStorage.getItem("cp_session") || "null");
        if (s && s.access_token) window.CP_SESSION = s;
      } catch {}
    }
  };
})();
