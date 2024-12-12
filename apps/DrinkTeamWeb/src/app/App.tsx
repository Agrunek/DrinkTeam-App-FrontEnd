import 'react-native-gesture-handler';
import React from 'react';
import { QueryClientProvider } from 'react-query';
import queryClient from '../middleware/queryClient';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';
import AppNavigator from '../navigation/AppNavigator';

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
