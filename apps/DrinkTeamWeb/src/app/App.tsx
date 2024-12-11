import 'react-native-gesture-handler';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from '../theme';
import AppNavigator from '../navigation/AppNavigator';
import notifee, { EventType } from '@notifee/react-native';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider> */}
          <AppNavigator />
        {/* </AuthProvider> */}
      </QueryClientProvider>
    </PaperProvider>
  );
};

export default App;
