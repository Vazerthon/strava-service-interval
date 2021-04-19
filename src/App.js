import Theme from './contexts/Theme';
import { SettingsProvider } from './contexts/Settings';
import { StravaProvider } from './contexts/Strava';
import Routes from './Routes';

function App() {
  return (
    <Theme>
      <SettingsProvider>
        <StravaProvider>
          <Routes />
        </StravaProvider>
      </SettingsProvider>
    </Theme>
  );
}

export default App;
