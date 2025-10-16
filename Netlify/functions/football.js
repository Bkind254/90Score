// netlify/functions/football.js

export async function handler(event) {
  const endpoint = event.queryStringParameters.endpoint;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': process.env.API_HOST,
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server error',
        details: error.message,
      }),
    };
  }
}
