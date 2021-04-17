import axios from 'axios';
import settings from '../settings';

export async function handler({ queryStringParameters }) {
  const { STRAVA_SECRET_KEY, STRAVA_CLIENT_ID } = process.env;
  const { code } = queryStringParameters;
  const { stravaTokenExchangeUrl } = settings;

  return axios
    .post(stravaTokenExchangeUrl, {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_SECRET_KEY,
      code,
      grant_type: 'authorization_code',
    })
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch((error) => ({
      statusCode: 200,
      body: JSON.stringify(error),
    }));
}
