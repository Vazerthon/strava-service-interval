import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Home() {
  const history = useHistory();
  const { routes, stravaAthleteUrl } = useContext(SettingsContext);
  const { stravaData } = useContext(StravaContext);

  useEffect(() => {
    if (!stravaData) {
      return;
    }

    axios
      .get(stravaAthleteUrl, {
        headers: { Authorization: `Bearer ${stravaData.accessToken}` },
      })
      .then(({ data }) => console.log(data));
  }, [stravaAthleteUrl, stravaData]);

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
