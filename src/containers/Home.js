import { useContext } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Home() {
  const { routes } = useContext(SettingsContext);
  const { loaded, strava } = useContext(StravaContext);
  const history = useHistory();
  
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
