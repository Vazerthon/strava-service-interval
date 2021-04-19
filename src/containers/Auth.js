import { useContext, useEffect, useCallback } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useHistory } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Auth() {
  const history = useHistory();
  const { makePublicTokenExchangeUrl, routes } = useContext(SettingsContext);
  const { state, setLoading, setStravaData, setError } = useContext(
    StravaContext,
  );
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const { loaded, loading } = state;

  const extractData = ({ data }) => data.body;

  const navigateToHome = useCallback(() => history.push(routes.home), [
    history,
    routes.home,
  ]);
  const handleError = useCallback(() => {
    setError();
    history.push(routes.welcome);
  }, [history, routes.welcome, setError]);

  useEffect(() => {
    const makeApiRequest = () =>
      axios
        .get(makePublicTokenExchangeUrl(code))
        .then(extractData)
        .then(setStravaData)
        .then(navigateToHome)
        .catch(handleError);

    if (code && !loading && !loaded) {
      setLoading();

      console.log(`Making API request for ${code}`);
      makeApiRequest();
    }
  }, [
    code,
    handleError,
    loaded,
    loading,
    makePublicTokenExchangeUrl,
    navigateToHome,
    setLoading,
    setStravaData,
  ]);

  if (loaded) {
    navigateToHome();
  }

  if (error) {
    handleError();
  }

  return <>Connecting to Strava...</>;
}
