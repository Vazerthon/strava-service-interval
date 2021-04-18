import { useContext } from 'react';
import qs from 'qs';
import axios from 'axios';

import { SettingsContext } from '../contexts/Settings';
import { useState } from 'react';

export default function Auth() {
  const { stravaAuthUrl, makePublicTokenExchangeUrl, stravaAthleteUrl } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const [stravaData, setStravaData] = useState(undefined);

  if (code) {
    axios
      .get(makePublicTokenExchangeUrl(code))
      .then(({ data }) => setStravaData(data))
      .catch(console.log);
  }

  if (stravaData) {
    axios
      .get(stravaAthleteUrl, {
        headers: { Authorization: `Bearer: ${stravaData.access_token}` }
      })
      .then(({ data }) => console.log(data))
      .catch(console.log);
  }

  return (
    <>
      {error && <div>There's an error</div>}

      <a href={stravaAuthUrl}>Connect with Strava</a>
    </>
  );
}
