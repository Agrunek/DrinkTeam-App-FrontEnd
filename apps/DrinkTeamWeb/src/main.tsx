import { AppRegistry } from 'react-native';
import App from './app/App';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent('DrinkTeamWeb', () => App);
