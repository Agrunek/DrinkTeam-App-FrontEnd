import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Text, useTheme } from 'react-native-paper';

function CustomDrawerContent(props) {
  const theme = useTheme();
  const { state, navigation } = props;
  const activeRoute = state?.routeNames[state?.index] ?? 'Login';

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate('Login')}
        labelStyle={{
          color: activeRoute === 'Login' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Login' ? 'bold' : 'normal',
        }}
      />
      <DrawerItem
        label="Recipies"
        onPress={() => props.navigation.navigate('Recipies')}
        labelStyle={{
          color: activeRoute === 'Recipies' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Recipies' ? 'bold' : 'normal',
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;