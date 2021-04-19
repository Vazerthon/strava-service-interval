import { useState, useContext, useEffect } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useHistory } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Auth() {
  const history = useHistory();
  const { makePublicTokenExchangeUrl, routes } = useContext(SettingsContext);
  const { setStravaData } = useContext(StravaContext);
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
  const [exchangeRequested, setExchangeRequested] = useState(false);

  useEffect(() => {
    const extractData = ({ data }) => data.body;
    const navigateToHome = () => history.push(routes.home);
    const handleError = () => history.push(routes.welcomeError);

    const makeApiRequest = (url) => {
      if (exchangeRequested) {
        return;
      }
      setExchangeRequested(true);

      axios
        .get(url)
        .then(extractData)
        .then(setStravaData)
        .then(navigateToHome)
        .catch(handleError);
    };

    if (code) {
      const url = makePublicTokenExchangeUrl(code);
      makeApiRequest(url);
    }

    if (error) {
      handleError();
    }
  }, [
    code,
    error,
    exchangeRequested,
    history,
    makePublicTokenExchangeUrl,
    routes.home,
    routes.welcomeError,
    setStravaData,
  ]);

  return <>Connecting to Strava...</>;
}
