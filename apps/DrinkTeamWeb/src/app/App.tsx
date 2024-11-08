import 'react-native-gesture-handler';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';
import AppNavigator from '../navigation/AppNavigator';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
