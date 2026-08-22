/* Portfolio Cloud Sync
   Supabase-backed persistence for the static GitHub Pages portfolio.
   IMPORTANT: only use a Supabase anon/publishable key here. Never put a service-role key in this file.
*/
(function () {
  'use strict';

  const CONFIG = window.PORTFOLIO_SUPABASE || {};
  const KEY_PREFIX = 'portfolio_';
  let client = null;
  let channel = null;
  let initialized = false;
  let authReady = false;
  let updateHandler = null;

  function enabled() {
    return !!(CONFIG.url && CONFIG.anonKey &&
      !String(CONFIG.url).includes('YOUR_') &&
      !String(CONFIG.anonKey).includes('YOUR_'));
  }

  function ensureClient() {
    if (!enabled()) return null;
    if (!client) {
      if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        console.error('Supabase JS library was not loaded.');
        return null;
      }
      client = window.supabase.createClient(CONFIG.url, CONFIG.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
    }
    return client;
  }

  function keysFromDefaults(defaults) {
    return Object.keys(defaults || {});
  }

  function setLocal(key, value) {
    try {
      localStorage.setItem(KEY_PREFIX + key, JSON.stringify(value));
    } catch (e) {
      console.error('Could not write localStorage:', e);
    }
  }

  function removeLocal(key) {
    try { localStorage.removeItem(KEY_PREFIX + key); } catch (e) {}
  }

  async function readRows(keys) {
    const c = ensureClient();
    if (!c) return { rows: [], error: null, enabled: false };

    const { data, error } = await c
      .from('portfolio_data')
      .select('key,value,updated_at')
      .in('key', keys);

    return { rows: data || [], error, enabled: true };
  }

  async function upsert(key, value) {
    const c = ensureClient();
    if (!c) return { ok: false, skipped: true };

    const { error } = await c.from('portfolio_data').upsert({
      key,
      value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'key' });

    if (error) {
      console.error('Cloud save failed for', key, error);
      if (typeof window.showToast === 'function') {
        window.showToast('Cloud save failed. Check Supabase setup.', 'error');
      }
      return { ok: false, error };
    }
    return { ok: true };
  }

  async function syncKey(key, value) {
    if (!enabled() || !authReady) return;
    return upsert(key, value);
  }

  function subscribe(keys, onUpdate) {
    const c = ensureClient();
    if (!c || channel) return;

    updateHandler = onUpdate || null;
    channel = c.channel('portfolio-live-sync')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'portfolio_data'
      }, payload => {
        const key = payload?.new?.key || payload?.old?.key;
        if (!key || (keys && !keys.includes(key))) return;

        if (payload.eventType === 'DELETE') {
          removeLocal(key);
          if (updateHandler) updateHandler(key, null, 'DELETE');
          return;
        }

        const value = payload.new?.value;
        setLocal(key, value);
        if (updateHandler) updateHandler(key, value, payload.eventType);
      })
      .subscribe(status => {
        if (status === 'CHANNEL_ERROR') {
          console.error('Supabase realtime channel error.');
        }
      });
  }

  async function loadPublic(defaults, onUpdate) {
    const keys = keysFromDefaults(defaults);
    const result = await readRows(keys);

    if (result.error) {
      console.warn('Cloud read failed; using local/default data.', result.error);
      return { cloud: false, error: result.error };
    }

    if (result.rows.length) {
      result.rows.forEach(row => setLocal(row.key, row.value));
    }
    // Subscribe even when the table is empty so the first admin seed is received live.
    subscribe(keys, onUpdate);
    return { cloud: true, rows: result.rows };
  }

  async function getSession() {
    const c = ensureClient();
    if (!c) return null;
    const { data } = await c.auth.getSession();
    return data?.session || null;
  }

  async function signIn(email, password) {
    const c = ensureClient();
    if (!c) return { error: new Error('Cloud sync is not configured.') };
    return c.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    const c = ensureClient();
    if (!c) return;
    await c.auth.signOut();
    authReady = false;
  }

  async function loadAdmin(defaults, onUpdate) {
    const keys = keysFromDefaults(defaults);
    const result = await readRows(keys);

    if (result.error) throw result.error;

    // First setup: seed the cloud from the current browser data/defaults.
    if (!result.rows.length) {
      for (const key of keys) {
        let value;
        try {
          const raw = localStorage.getItem(KEY_PREFIX + key);
          value = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaults[key]));
        } catch (e) {
          value = JSON.parse(JSON.stringify(defaults[key]));
        }
        setLocal(key, value);
        await upsert(key, value);
      }
    } else {
      const present = new Set();
      result.rows.forEach(row => {
        present.add(row.key);
        setLocal(row.key, row.value);
      });

      // Keep the cloud schema complete if new sections were added later.
      for (const key of keys) {
        if (!present.has(key)) {
          let value;
          try {
            const raw = localStorage.getItem(KEY_PREFIX + key);
            value = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(defaults[key]));
          } catch (e) {
            value = JSON.parse(JSON.stringify(defaults[key]));
          }
          setLocal(key, value);
          await upsert(key, value);
        }
      }
    }

    authReady = true;
    subscribe(keys, onUpdate);
    initialized = true;
    return { cloud: true };
  }

  async function initAdmin(defaults, onUpdate) {
    if (!enabled()) return { enabled: false, session: null };
    const session = await getSession();
    if (!session) return { enabled: true, session: null };

    await loadAdmin(defaults, onUpdate);
    return { enabled: true, session };
  }

  window.PortfolioCloud = {
    enabled,
    initPublic: loadPublic,
    initAdmin,
    loadAdmin,
    signIn,
    signOut,
    getSession,
    syncKey,
    isInitialized: () => initialized
  };
})();
