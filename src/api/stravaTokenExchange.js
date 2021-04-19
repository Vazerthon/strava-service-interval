import axios from 'axios';
import qs from 'qs';
import settings from '../settings';

export async function handler({ queryStringParameters }) {
  const { STRAVA_SECRET_KEY, STRAVA_CLIENT_ID } = process.env;
  const { code } = queryStringParameters;
  const { stravaTokenExchangeUrl } = settings;

  const stravaClientId = STRAVA_CLIENT_ID;
  const stravaClientSecret = STRAVA_SECRET_KEY;

  const data = {
    code,
    client_id: stravaClientId,
    client_secret: stravaClientSecret,
    grant_type: 'authorization_code',
  };

  let body;
  let status;
  try {
    const result = await axios({
      method: 'POST',
      responseType: 'json',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url: stravaTokenExchangeUrl,
    });

    const stravaData = {
      accessToken: result.data.access_token,
      refreshToken: result.data.refresh_token,
      tokenExpiresAt: result.data.expires_at,
      athleteId: result.data.athlete.id,
      athleteFirstName: result.data.athlete.firstname,
      athleteLastName: result.data.athlete.lastname,
    };

    body = JSON.stringify(stravaData);
    status = 200;
  } catch (error) {
    body = error.response.data;
    status = error.response.status;
  }

  return {
    statusCode: status,
    body,
  };
}
