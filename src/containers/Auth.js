import { useContext } from 'react';
import qs from 'qs';
import axios from 'axios';
import { useHistory } from 'react-router';

import { SettingsContext } from '../contexts/Settings';
import { StravaContext } from '../contexts/Strava';

export default function Auth() {
  const history = useHistory();
  const { makePublicTokenExchangeUrl, routes } = useContext(SettingsContext);
  const { loaded, setStravaData, setError } = useContext(StravaContext);
  const { code, error } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const extractData = ({ data }) => data.body;
  const navigateToHome = () => history.push(routes.home);
  const navigateToWelcome = () => history.push(routes.welcome);
  const handleError = () => {
    setError();
    navigateToWelcome();
  };

  if (loaded) {
    navigateToHome();
  }

  if (code) {
    axios
      .get(makePublicTokenExchangeUrl(code))
      .then(extractData)
      .then(setStravaData)
      .then(navigateToHome)
      .catch(handleError);
  }

  if (error) {
    handleError();
  }

  return <>Connecting to Strava...</>;
}
