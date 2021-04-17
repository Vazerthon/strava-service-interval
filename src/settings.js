const stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
const stravaRedirectUrl = process.env.REACT_APP_STRAVA_REDIRECT_URL;
const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${stravaRedirectUrl}&approval_prompt=force&scope=read`;
const stravaTokenExchangeUrl = 'https://www.strava.com/api/v3/oauth/token';
const makePublicTokenExchangeUrl = (accessCode) => `.netlify/functions/stravaTokenExchange?code=${accessCode}`;

const settings = {
  stravaClientId,
  stravaAuthUrl,
  stravaTokenExchangeUrl,
  makePublicTokenExchangeUrl,
};

export default settings;