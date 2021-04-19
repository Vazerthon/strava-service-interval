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

  const onSuccess = ({ data }) => ({
    statusCode: 200,
    body: JSON.stringify(data),
  });

  const onError = () => ({ statusCode: 400 });

  try {
    const result = await axios(options);

    console.log('data', JSON.stringify(result.data));

    return onSuccess(result);
  } catch (error) {
    return onError();
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
