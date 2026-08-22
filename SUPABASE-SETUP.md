# Supabase setup — permanent + realtime portfolio updates

This project keeps the existing design and admin interface. Supabase is only used as the backend so that changes made in `admin.html` are permanently stored and pushed to the public portfolio in real time.

## 1. Create a Supabase project

Create a project at Supabase and wait until the project is ready.

## 2. Create the database table

Open **SQL Editor** and run everything in:

`supabase-schema.sql`

This creates the `portfolio_data` table, Row Level Security policies, and enables Realtime for the table.

## 3. Create the admin account

In **Authentication → Users**, create one email/password user for yourself.

Use the same email/password when signing into `admin.html`.

After creating the account, disable public sign-ups in the Authentication settings. The admin page is not meant to be a public registration page.

## 4. Get the project URL and public key

Open **Project Settings → API** and copy:

- Project URL
- anon/public key (or publishable key, depending on your Supabase dashboard)

Do NOT copy the `service_role` or any secret key.

## 5. Put the credentials in `supabase-config.js`

Open:

```text
supabase-config.js
```

Replace:

```js
window.PORTFOLIO_SUPABASE = {
  url: "YOUR_SUPABASE_PROJECT_URL",
  anonKey: "YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY"
};
```

with your actual Project URL and public anon/publishable key.

## 6. Upload the complete project to GitHub

Upload all files, including:

```text
index.html
admin.html
cloud-sync.js
supabase-config.js
supabase-schema.sql
data/
```

Keep `index.html` at the repository root.

## 7. First admin login

Open:

```text
https://YOUR-USERNAME.github.io/admin.html
```

Sign in.

On the first successful login, the current portfolio data in the browser/default data is seeded into Supabase if the database is empty.

After that:

**Admin → Save → Supabase → Public website**

The public website subscribes to Supabase Realtime, so an already-open portfolio page can receive the updated data without manually editing JSON files.

## 8. How persistence works

```text
Admin form
   ↓
Existing Store.set()
   ↓
localStorage cache (instant)
   ↓
Supabase portfolio_data (permanent)
   ↓
Supabase Realtime
   ↓
Public index.html
```

If the public page is opened on another computer/browser, it reads the same cloud data.

## 9. Important security note

`supabase-config.js` is public because GitHub Pages is public. That is normal for the Supabase anon/publishable key.

Security comes from Supabase Row Level Security + Authentication.

Never put a Supabase `service_role`/secret key in:

- `supabase-config.js`
- `index.html`
- `admin.html`
- GitHub
- browser JavaScript

## 10. If you do not configure Supabase yet

The website still works using the original localStorage/default-data behavior. However, permanent cross-device saving and realtime synchronization require the Supabase setup above.
