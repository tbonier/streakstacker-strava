# Visuals Wave 1 — Streak Stacker

This PR adds the first visual upgrade wave:

## What's new
- **Weekly ring** (Apple‑Watch style) with animated progress + header streak meter
- **90‑day heatmap** (minutes → intensity shading) with hover tooltips
- **Milestone toasts + confetti** (7/14/21‑day streaks, 1,000 points, first day)
- **Badge shelf polish** with level progress bar

## Notes
- No external libraries; pure SVG/CSS/JS for speed.
- Data model unchanged (localStorage). Key upgraded to `streakstacker.v3` to avoid conflicts while testing.
- Strava integration untouched in this wave.

## How to test
1. Open the site, set a weekly goal, click **Mark Today Complete** → ring + header meter animate, toast appears.
2. Add entries for prior days to deepen heatmap.
3. Hit milestones (7‑day streak or 1,000 pts) to see confetti + toast.

If approved, I’ll follow with Wave 2 (sparkline, donut, intensity bar, theme toggle).
