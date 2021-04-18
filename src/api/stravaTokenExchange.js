import axios from 'axios';
import settings from '../settings';

export function handler({ queryStringParameters }) {
  const { STRAVA_SECRET_KEY, STRAVA_CLIENT_ID } = process.env;
  const { code } = queryStringParameters;
  const { stravaTokenExchangeUrl } = settings;

  const data = {
    code,
    client_id: STRAVA_CLIENT_ID,
    client_secret: STRAVA_SECRET_KEY,
    grant_type: 'authorization_code',
  };

  const options = {
    method: 'POST',
    url: stravaTokenExchangeUrl,
    data,
  };

  return axios(options)
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch(() => ({
      statusCode: 400,
      body: 'error',
    }));
}
