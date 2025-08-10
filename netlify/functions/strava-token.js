// /.netlify/functions/strava-token
exports.handler = async (event) => {
  try {
    // Preflight for CORS
    if (event.httpMethod === 'OPTIONS') {
      return resp(200, '');
    }

    const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, REDIRECT_URI } = process.env;

    // Expose client_id so the client can build the Strava auth URL
    if (event.httpMethod === 'GET') {
      return json(200, { client_id: STRAVA_CLIENT_ID || null });
    }

    const body = JSON.parse(event.body || '{}');

    // Build params for either code exchange or refresh
    const params = new URLSearchParams();
    params.set('client_id', STRAVA_CLIENT_ID);
    params.set('client_secret', STRAVA_CLIENT_SECRET);

    if (body.refresh_token || body.grant_type === 'refresh_token') {
      params.set('grant_type', 'refresh_token');
      params.set('refresh_token', body.refresh_token);
    } else {
      params.set('grant_type', 'authorization_code');
      params.set('code', body.code);
      params.set('redirect_uri', body.redirect_uri || REDIRECT_URI);
    }

    const r = await fetch('https://www.strava.com/api/v3/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params
    });

    if (!r.ok) {
      const text = await r.text();
      return json(400, { error: 'token_error', detail: text });
    }

    const data = await r.json();
    // Return only what the client needs
    return json(200, {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      token_type: data.token_type,
      expires_at: data.expires_at,
      athlete: data.athlete ? {
        id: data.athlete.id,
        username: data.athlete.username,
        firstname: data.athlete.firstname,
        lastname: data.athlete.lastname
      } : null
    });
  } catch (e) {
    return json(500, { error: 'server_error', detail: String(e) });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}
function resp(status, body) {
  return { statusCode: status, headers: corsHeaders(), body };
}
function json(status, obj) {
  return resp(status, JSON.stringify(obj));
}
