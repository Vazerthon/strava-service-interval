import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const StravaContext = createContext();

const defaultStravaData = {
  oneTimeCode: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  tokenExpiresAt: undefined,
  athleteId: undefined,
  athleteFirstName: undefined,
  athleteLastName: undefined,
};

const defaultState = {
  loaded: false,
  loading: false,
  error: false,
  strava: defaultStravaData,
};

export const StravaProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const setStravaData = (strava) =>
    setState({
      ...state,
      loading: false,
      strava: { ...state.strava, ...strava },
    });

  const setError = () =>
    setState({
      loaded: false,
      loading: false,
      error: true,
      strava: defaultStravaData,
    });

  const setLoading = () => setState({ ...state, loading: true });

  const setOneTimeCode = (code) =>
    setState({ ...state, strava: { ...state.strava, oneTimeCode: code } });

  const value = {
    state,
    setStravaData,
    setError,
    setLoading,
    setOneTimeCode,
  };

  return (
    <StravaContext.Provider value={value}>{children}</StravaContext.Provider>
  );
};

StravaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
