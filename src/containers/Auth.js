import { useState, useContext, useEffect } from 'react';
import qs from 'qs';
import { useHistory } from 'react-router';

import useStrava from '../hooks/useStrava';
import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const [exchangeRequested, setExchangeRequested] = useState(false);
  const history = useHistory();
  const { makeTokenExchangeRequest } = useStrava();
  const { routes } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    if (exchangeRequested) {
      return;
    }
    setExchangeRequested(true);

    if (code) {
      makeTokenExchangeRequest(code);
    }

    if (error) {
      history.push(routes.welcomeError);
    }
  }, [
    code,
    error,
    exchangeRequested,
    history,
    makeTokenExchangeRequest,
    routes.home,
    routes.welcomeError,
  ]);

  return <>Connecting to Strava...</>;
}
