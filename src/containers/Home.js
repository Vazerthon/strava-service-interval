import { useContext } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Home() {
  const history = useHistory();
  const { routes } = useContext(SettingsContext);
  const { state, strava } = useContext(StravaContext);
  const { loaded } = state;

  if (!loaded) {
    history.push(routes.welcome);
    return <></>;
  }

  return (
    <>
      Welcome {strava.athleteFirstName} {strava.athleteLastName}!
    </>
  );
}
