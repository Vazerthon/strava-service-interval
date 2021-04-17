import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Theme from './contexts/Theme';
import { SettingsProvider } from './contexts/Settings';

import Home from './containers/Home';
import Auth from './containers/Auth';

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <BrowserRouter>
          <Switch>
          <Route path="/auth" exact>
              <Auth />
            </Route>
            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
