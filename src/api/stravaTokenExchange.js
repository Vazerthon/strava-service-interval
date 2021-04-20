import axios from 'axios';
import qs from 'qs';
import settings from '../settings';

export const makeTokenExchangeRequest = async (
  stravaClientSecret,
  stravaClientId,
  stravaTokenExchangeUrl,
  code,
) => {
  const data = {
    code,
    client_id: stravaClientId,
    client_secret: stravaClientSecret,
    grant_type: 'authorization_code',
  };

  const options = {
    method: 'POST',
    responseType: 'json',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: stravaTokenExchangeUrl,
  };

  try {
    const { data } = await axios(options);
    
    const stravaData = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      tokenExpiresAt: data.expires_at,
      athleteId: data.athlete.id,
      athleteFirstName: data.athlete.firstname,
      athleteLastName: data.athlete.lastname,
      bikes: data.athlete.bikes,
    };

    const stravaDataString = JSON.stringify(stravaData);
    
    return {
      statusCode: 200,
      body: stravaDataString,
    };
  } catch (error) {
    return {
      statusCode: 400,
    };
  }
};

export function handler({ queryStringParameters }) {
  const { STRAVA_SECRET_KEY, STRAVA_CLIENT_ID } = process.env;
  const { code } = queryStringParameters;
  const { stravaTokenExchangeUrl } = settings;

  return makeTokenExchangeRequest(
    STRAVA_SECRET_KEY,
    STRAVA_CLIENT_ID,
    stravaTokenExchangeUrl,
    code,
  );
}
