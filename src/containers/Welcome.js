import { useContext } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Welcome() {
  const history = useHistory();
  const { stravaAuthUrl, routes } = useContext(SettingsContext);
  const { state } = useContext(StravaContext);
  const { loaded, error } = state;

  const navigateToHome = () => history.push(routes.home);

  if (loaded) {
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
