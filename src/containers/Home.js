import { useContext } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Home() {
  const history = useHistory();
  const { routes } = useContext(SettingsContext);
  const { stravaData } = useContext(StravaContext);

  if (!stravaData) {
    history.push(routes.welcome);
    return <></>;
  }

  const { athleteFirstName, athleteLastName } = stravaData;

  return (
    <>
      Welcome {athleteFirstName} {athleteLastName}!
    </>
  );
}
