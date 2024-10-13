/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';
import LoginView from '../views/Login/LoginView';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <LoginView />
    </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
