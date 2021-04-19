import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const StravaContext = createContext();

export const StravaProvider = ({ children }) => {
  const [stravaData, setStravaData] = useState(undefined);

  const value = {
    stravaData,
    setStravaData,
  };

  return (
    <StravaContext.Provider value={value}>{children}</StravaContext.Provider>
  );
};

StravaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
