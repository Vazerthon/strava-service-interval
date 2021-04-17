import axios from 'axios';
import settings from '../settings';

export async function handler({ queryStringParameters }) {
  const { STRAVA_SECRET_KEY, STRAVA_CLIENT_ID } = process.env;
  const { code } = queryStringParameters;
  const url = settings.makeStravaTokenExchangeUrl(STRAVA_SECRET_KEY, STRAVA_CLIENT_ID, code);

  return axios
    .get(url)
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch((error) => ({
      statusCode: 200,
      body: JSON.stringify(error)
    }));
}
