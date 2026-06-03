const CACHE_TTL = 60000;
let cache = { data: null, ts: 0 };

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=60'
  };

  if (cache.data && Date.now() - cache.ts < CACHE_TTL) {
    return { statusCode: 200, headers, body: JSON.stringify(cache.data) };
  }

  try {
    const res = await fetch(
      'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    if (!res.ok) throw new Error('ESPN ' + res.status);
    const data = await res.json();
    cache = { data, ts: Date.now() };
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    if (cache.data) return { statusCode: 200, headers, body: JSON.stringify(cache.data) };
    return { statusCode: 502, headers, body: JSON.stringify({ error: err.message }) };
  }
};
