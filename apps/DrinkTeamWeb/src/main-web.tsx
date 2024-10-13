import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import './App.css';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(iconFontStyles));
document.head.appendChild(style);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
