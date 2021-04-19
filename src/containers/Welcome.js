import { useContext } from 'react';
import { useHistory } from 'react-router';
import qs from 'qs';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Welcome() {
  const history = useHistory();
  const { error } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  const { stravaAuthUrl, routes } = useContext(SettingsContext);
  const { stravaData } = useContext(StravaContext);

  const navigateToHome = () => history.push(routes.home);

  if (stravaData) {
    navigateToHome();
  }

  return (
    <>
      Welcome! You need to connect your Strava account
      { error && <p>There was an error connecting to Strava, please try again</p> }
      <p>
        <a href={stravaAuthUrl}>Connect with Strava</a>
      </p>
    </>
  );
}
