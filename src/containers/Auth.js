import { useContext } from 'react';
import qs from 'qs';

import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const { stravaAuthUrl } = useContext(SettingsContext);
  const { code, error } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  return <>
    { error && <>There's an error</> }
    { code && <>Your code is {code}</> }
    
    <a href={stravaAuthUrl}>Connect with Strava</a>
  </>;
}
