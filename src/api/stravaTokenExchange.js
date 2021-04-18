import axios from 'axios';
import qs from 'qs';
import settings from '../settings';

export async function handler({ queryStringParameters }) {
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
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: stravaTokenExchangeUrl,
  };

  return axios(options)
    .then((result) => ({
      statusCode: 200,
      body: JSON.stringify(result),
    }))
    .catch((error) => ({
      statusCode: 200,
      body: JSON.stringify(error)
    }));
}
