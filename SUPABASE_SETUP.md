# 🚀 Supabase Setup Guide

This guide will help you connect your Personal Finance Manager to Supabase for cloud backup and sync.

## 📋 What You Need

- Supabase Project: **Familybudget**
- Project URL: `https://ohuacjksnmmzltgfvbdo.supabase.co`
- Database Password: `LYGhJYvdV9WbVxZ9`

## Step 1: Get Your Anon Key

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/ohuacjksnmmzltgfvbdo
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under Project Settings
4. Copy the **anon/public** key (NOT the service_role key!)

It will look something like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9odWFjamtzbm1temx0Z2Z2YmRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MzA0MDAsImV4cCI6MjAyNTMwNjQwMH0.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Step 2: Set Up Database Tables

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click **Run** or press `Ctrl+Enter`
5. You should see "Success. No rows returned" - that's good! ✅

This creates:
- ✅ `expenses` table
- ✅ `trip_savings` table
- ✅ `finance_data` table
- ✅ Indexes for performance
- ✅ Row Level Security policies
- ✅ Automatic timestamps

## Step 3: Add Environment Variables

### For Local Development

Create a file named `.env.local` in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ohuacjksnmmzltgfvbdo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace `your-anon-key-here` with the anon key you copied in Step 1.

### For Vercel Deployment

1. Go to your Vercel project dashboard
2. Click on **Settings** → **Environment Variables**
3. Add these two variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ohuacjksnmmzltgfvbdo.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key from Step 1 |

4. Click **Save**
5. Redeploy your app

## Step 4: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:3000

3. Look for the sync status in the header:
   - 🟢 **"Synced"** = Connected to Supabase ✅
   - ⚪ **"Local Only"** = Using localStorage only

4. Check the browser console (F12):
   - You should see: `✅ Supabase connected - auto-sync enabled`

## 🎯 How It Works

### Hybrid Storage System

Your app now uses a **hybrid approach**:

1. **Primary Storage: localStorage**
   - ✅ Instant saves
   - ✅ Works offline
   - ✅ No latency

2. **Backup Storage: Supabase**
   - ✅ Cloud backup
   - ✅ Sync across devices
   - ✅ Never lose data

### Auto-Sync

Every time you:
- Add income
- Add/edit/delete expense
- Add trip savings
- Update any data

The app automatically:
1. Saves to localStorage (instant)
2. Syncs to Supabase (background)

### Data Recovery

If you ever:
- Clear browser cache
- Switch browsers
- Use a new device

The app will:
1. Check localStorage first
2. If empty, load from Supabase
3. Restore all your data ✅

## 🔒 Security

### Current Setup (No Auth)

- ✅ Open access policies
- ✅ Perfect for personal use
- ✅ Single user
- ✅ No login required

### Future: Add Authentication (Optional)

To add user accounts and multi-user support:

1. Enable Supabase Auth
2. Update RLS policies to filter by `user_id`
3. Add login/signup UI

This is optional and not needed for personal use!

## 📊 Viewing Your Data

### Supabase Dashboard

1. Go to **Table Editor** in Supabase
2. Select any table:
   - `expenses` - All your expenses
   - `trip_savings` - Germany trip progress
   - `finance_data` - Salary and snapshots

3. View, edit, or export your data

### SQL Queries

You can run custom queries in the SQL Editor:

```sql
-- View all expenses this month
SELECT * FROM expenses 
WHERE date >= date_trunc('month', CURRENT_DATE)
ORDER BY date DESC;

-- Total spending by category
SELECT category, SUM(amount) as total
FROM expenses
WHERE recurring = false
GROUP BY category
ORDER BY total DESC;

-- Trip savings progress
SELECT * FROM trip_savings;
```

## 🐛 Troubleshooting

### "Local Only" Status

**Problem:** App shows "Local Only" instead of "Synced"

**Solutions:**
1. Check if `.env.local` exists with correct values
2. Restart dev server (`npm run dev`)
3. Clear browser cache and reload
4. Verify anon key is correct (no extra spaces)

### Sync Errors in Console

**Problem:** Errors like "Could not connect to Supabase"

**Solutions:**
1. Check if you ran the schema.sql
2. Verify tables exist in Supabase dashboard
3. Check if RLS policies are enabled
4. Verify URL and key are correct

### Data Not Syncing

**Problem:** Changes not appearing in Supabase

**Solutions:**
1. Check browser console for errors
2. Verify internet connection
3. Check Supabase project is active
4. Try manual sync by refreshing the page

## 🔄 Manual Data Migration

If you have existing data in localStorage and want to ensure it's in Supabase:

1. Open browser console (F12)
2. Run:
```javascript
localStorage.clear()
location.reload()
```
3. Re-enter your data (it will auto-sync)

OR

1. Export your data (Data Management → Export)
2. Clear browser data
3. Import the JSON file
4. It will auto-sync to Supabase

## 📈 Database Maintenance

### Backup Your Data

Supabase automatically backs up your database, but you can also:

1. Export from Supabase dashboard
2. Or use the app's Export feature

### Check Database Size

Free tier includes:
- ✅ 500MB database storage
- ✅ Unlimited API requests
- ✅ 50,000 monthly active users

Your finance data is tiny (~1KB per month), so you'll never hit limits!

## ✅ Success Checklist

- [ ] Ran `schema.sql` in Supabase SQL Editor
- [ ] Got anon key from Supabase dashboard
- [ ] Added environment variables to `.env.local`
- [ ] Restarted dev server
- [ ] See "Synced" status in header
- [ ] Console shows "Supabase connected"
- [ ] Added/edited expense and it appeared in Supabase table

## 🎉 You're Done!

Your Personal Finance Manager is now:
- ✅ Backed up to the cloud
- ✅ Safe from data loss
- ✅ Ready for multi-device use
- ✅ Automatically syncing

## 📞 Need Help?

If you run into issues:
1. Check the browser console for error messages
2. Verify all environment variables are set
3. Make sure schema.sql was run successfully
4. Check Supabase project is active and not paused

---

**Happy budgeting with cloud backup! 💰☁️**

