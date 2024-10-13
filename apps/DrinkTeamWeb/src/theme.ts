import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5C4D7D',  // Purple shade for header background
    accent: '#00C48C',   // Green color for the login button
    background: '#222',  // Dark background color for login form area
    surface: '#FFF',     // White background for text input fields
    text: '#FFF',        // White text for contrast
    placeholder: '#8A8A8A',  // Gray for placeholder text
    buttonText: '#FFFFFF', // White for button text
  },
};

export default theme;
