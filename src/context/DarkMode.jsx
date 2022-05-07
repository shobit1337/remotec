import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      mode,
      toggleDarkMode: () => {
        localStorage.setItem('theme', mode === 'light' ? 'dark' : 'light');
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: {
                  default: '#1E1F21',
                  paper: '#1E1F21',
                },
              }
            : {
                background: {
                  default: '#F7FAFC',
                  paper: '#F7FAFC',
                },
              }),
        },
      }),
    [mode],
  );

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setMode(theme);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <DarkModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => useContext(DarkModeContext);

export { DarkModeProvider, useDarkMode };
