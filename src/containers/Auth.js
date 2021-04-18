import { useContext } from 'react';
import qs from 'qs';
import { makeTokenExchangeRequest } from '../api/stravaTokenExchange';

import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const { stravaAuthUrl, stravaTokenExchangeUrl } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const exchangeCode = () =>
    makeTokenExchangeRequest('', '', stravaTokenExchangeUrl, code).then(
      console.log,
    );

  return (
    <>
      {error && <div>There's an error</div>}
      {code && <div>Your code is {code}</div>}

      <a href={stravaAuthUrl}>Connect with Strava</a>
      <button onClick={exchangeCode}>exchange code</button>
    </>
  );
}
