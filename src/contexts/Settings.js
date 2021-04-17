import { createContext } from 'react';
import PropTypes from 'prop-types';

export const SettingsContext = createContext();

const stravaClientId = process.env.REACT_APP_STRAVA_CLIENT_ID;
const stravaRedirectUrl = process.env.REACT_APP_STRAVA_REDIRECT_URL;
const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${stravaClientId}&response_type=code&redirect_uri=${stravaRedirectUrl}&approval_prompt=force&scope=read`;

export const SettingsProvider = ({ children }) => {
  const value = {
    stravaClientId,
    stravaAuthUrl,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
