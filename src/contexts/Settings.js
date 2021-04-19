import { createContext } from 'react';
import PropTypes from 'prop-types';
import settings from '../settings';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
