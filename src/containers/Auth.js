import { useContext } from 'react';
import qs from 'qs';
import axios from 'axios';

import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const { stravaAuthUrl, makePublicTokenExchangeUrl } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const exchangeCode = (accessCode) => () =>
    axios
      .get(makePublicTokenExchangeUrl(accessCode))
      .then(console.log);

  return (
    <>
      {error && <>There's an error</>}
      {code && <>Your code is {code}</>}

      <a href={stravaAuthUrl}>Connect with Strava</a>
      <button onClick={exchangeCode(code)}>exchange code</button>
    </>
  );
}
