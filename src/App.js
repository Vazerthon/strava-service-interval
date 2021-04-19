import Theme from './contexts/Theme';
import { SettingsProvider } from './contexts/Settings';
import { StravaProvider } from './contexts/Strava';
import Router from './Router';

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <StravaProvider>
          <Router />
        </StravaProvider>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
