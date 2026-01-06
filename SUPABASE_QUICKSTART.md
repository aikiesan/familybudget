# ⚡ Supabase Quick Setup (5 Minutes)

## 🎯 You Need Just 2 Things

### 1. Your Anon Key

**Where to find it:**
1. Go to: https://supabase.com/dashboard/project/ohuacjksnmmzltgfvbdo/settings/api
2. Look for **"anon" "public"** key
3. Click the eye icon to reveal it
4. Click copy

### 2. Run This SQL

**Where to run it:**
1. Go to: https://supabase.com/dashboard/project/ohuacjksnmmzltgfvbdo/sql/new
2. Paste the contents of `supabase/schema.sql`
3. Click **Run** (or Ctrl+Enter)

## 🔧 Local Development

Create `.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://ohuacjksnmmzltgfvbdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-from-step-1
```

Then restart:
```bash
npm run dev
```

## ☁️ Vercel Deployment

Add these in **Vercel → Settings → Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ohuacjksnmmzltgfvbdo.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (your anon key) |

Then redeploy.

## ✅ Check It Works

Look for **"Synced"** badge in the header (top right)

Console should show:
```
✅ Supabase connected - auto-sync enabled
```

## 🎉 Done!

Your data now automatically syncs to the cloud!

---

**Full guide:** See `SUPABASE_SETUP.md` for detailed instructions

