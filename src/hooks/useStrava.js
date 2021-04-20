import { useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

const useStrava = () => {
  const history = useHistory();
  const { makePublicTokenExchangeUrl, stravaAthleteUrl, routes } = useContext(
    SettingsContext,
  );
  const { setStravaData, stravaData } = useContext(StravaContext);
  const navigateToHome = () => history.push(routes.home);
  const handleError = () => history.push(routes.welcomeError);

  const extractData = ({ data }) => data;
  const makeAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${stravaData.accessToken}` },
  });

  const patchBikes = ({ bikes }) =>
    setStravaData({ ...stravaData, athleteBikes: bikes });

  const makeTokenExchangeRequest = (code) =>
    axios
      .get(makePublicTokenExchangeUrl(code))
      .then(extractData)
      .then(setStravaData)
      .then(navigateToHome)
      .catch(handleError);

  const loadAthleteBikes = () =>
    axios
      .get(stravaAthleteUrl, makeAuthHeaders())
      .then(extractData)
      .then(patchBikes);

  return {
    makeTokenExchangeRequest,
    loadAthleteBikes,
  };
};

export default useStrava;
