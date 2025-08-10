# Visuals + Strava Integration (with migration safeguard)

**What this PR does**
- Keeps Visuals Wave 1 (streak ring, header meter, 90‑day heatmap, confetti/toasts, badge shelf)
- Restores Strava sidebar (**Connect**, **Import last 30 days**, **Disconnect**)
- Includes token refresh + import logic (uses Netlify function `/.netlify/functions/strava-token`)
- Adds a migration so `v3` automatically reads existing `streakstacker.v2` data

**How to test**
1. Load the site → verify your existing workouts appear.
2. Click **Integrations → Connect Strava** (if not already connected) and authorize.
3. Click **Import last 30 days** → recent days should fill in.
