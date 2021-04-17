import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
const stravaRedirectUrl = process.env.REACT_APP_STRAVA_REDIRECT_URL;
const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${stravaRedirectUrl}&approval_prompt=force&scope=read`;
const makeStravaTokenExchangeUrl = (stravaClientSecret, accessCode) =>
  `https://www.strava.com/api/v3/oauth/token?grant_type=authorization_code&client_id=${stravaClientId}&client_secret=${stravaClientSecret}&code=${accessCode}`;

export const settings = {
  stravaClientId,
  stravaAuthUrl,
  makeStravaTokenExchangeUrl,
}

export const SettingsProvider = ({ children }) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
