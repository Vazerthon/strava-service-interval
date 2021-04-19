import { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import Auth from './containers/Auth';
import Welcome from './containers/Welcome';
import NotFound from './containers/NotFound';
import { SettingsContext } from './contexts/Settings';

function Routes() {
  const { routes } = useContext(SettingsContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.auth} exact>
          <Auth />
        </Route>
        <Route path={routes.welcome} exact>
          <Welcome />
        </Route>
        <Route path={routes.home} exact>
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
