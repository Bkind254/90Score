// netlify/functions/football.js
export const handler = async (event) => {
  const endpoint = event.queryStringParameters?.endpoint;

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing endpoint parameter" }),
    };
  }

  // ✅ Works both locally and on Netlify
  const apiKey = process.env.VITE_API_KEY || process.env.API_KEY;
  const baseUrl = process.env.VITE_API_BASE_URL || "https://v3.football.api-sports.io";

  if (!apiKey) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing API key" }),
    };
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "x-apisports-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(
        response.ok ? data : { error: data.errors?.[0] || "API error" }
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
};
