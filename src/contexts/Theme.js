import { ThemeProvider } from '@emotion/react';

const spacingUnit = 0.25;

const theme = {
  typography: {
    fontFamilyBody: 'sans-serif',
    fontFamilyHeading: 'serif',
    baseFontSizePx: '16',
  },
  colour: {
    neutral: {
      light: '#ffffff',
      mid: '#555555',
      dark: '#000000',
    },
    primary: 'red',
    secondary: 'blue',
  },
  spacing: {
    unit: spacingUnit,
    units: (multiple) => `${multiple * spacingUnit}rem`,
  },
};

function Theme({ children }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default Theme;
