import { useContext } from 'react';
import { SettingsContext } from '../contexts/Settings';

export default function Auth() {
  const { stravaAuthUrl } = useContext(SettingsContext);

  return <>
    <a href={stravaAuthUrl}>Connect with Strava</a>
  </>;
}
