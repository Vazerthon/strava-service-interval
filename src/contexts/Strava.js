import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const StravaContext = createContext();

const defaultStravaData = {
  accessToken: undefined,
  refreshToken: undefined,
  tokenExpiresAt: undefined,
  athleteId: undefined,
  athleteFirstName: undefined,
  athleteLastName: undefined,
};

const defaultState = {
  loaded: false,
  error: false,
  strava: defaultStravaData,
};

export const StravaProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const setStravaData = (strava) => setState({ ...state, strava });
  const setError = () =>
    setState({
      loaded: false,
      error: true,
      strava: defaultStravaData,
    });

  const value = {
    state,
    setStravaData,
    setError,
  };

  return (
    <StravaContext.Provider value={value}>{children}</StravaContext.Provider>
  );
};

StravaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
