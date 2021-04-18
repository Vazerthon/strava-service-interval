import { useContext } from 'react';
import qs from 'qs';
import axios from 'axios';

import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const { stravaAuthUrl, makePublicTokenExchangeUrl } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  const exchangeCode = () => {
    const url = makePublicTokenExchangeUrl(code);
    axios.get(url).then(console.log).catch(console.log);
  }

  return (
    <>
      {error && <div>There's an error</div>}
      {code && <div>Your code is {code}</div>}

      <a href={stravaAuthUrl}>Connect with Strava</a>
      <button onClick={exchangeCode}>exchange code</button>
    </>
  );
}
