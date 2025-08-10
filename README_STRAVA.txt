# Streak Stacker — Strava Integration

This version adds Strava import using a Netlify Function for secure OAuth.

## Steps

1) **Create Strava API app**
- https://www.strava.com/settings/api
- Note Client ID and Client Secret
- Set Authorization Callback Domain to your Netlify site host (e.g. `your-site.netlify.app`)

2) **Deploy to Netlify**
- New site → Import from GitHub or Deploy manually (drag this whole folder)
- Wait for deploy to finish

3) **Set Netlify environment variables**
- STRAVA_CLIENT_ID: your numeric id
- STRAVA_CLIENT_SECRET: your secret
- REDIRECT_URI: https://<your-site>.netlify.app/  (must end with slash)
- Redeploy

4) **Connect Strava in the app**
- Open your site
- Click Integrations → Connect Strava
- Authorize, then Import last 30 days

Tokens are stored in your browser only; the function handles token exchange/refresh.
