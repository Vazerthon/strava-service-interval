import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';
import useStrava from '../hooks/useStrava';

export default function Home() {
  const history = useHistory();
  const { routes } = useContext(SettingsContext);
  const { stravaData } = useContext(StravaContext);
  const { loadAthleteBikes } = useStrava();

  useEffect(() => {
    if (!stravaData) {
      return;
    }

    loadAthleteBikes();
  }, [loadAthleteBikes, stravaData]);

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
