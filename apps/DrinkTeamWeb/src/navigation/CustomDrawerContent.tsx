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
        onPress={() => navigation.navigate('Login')}
        labelStyle={{
          color: activeRoute === 'Login' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Login' ? 'bold' : 'normal',
        }}
      />
      <DrawerItem
        label="Recipes"
        onPress={() => navigation.navigate('Recipes')}
        labelStyle={{
          color: activeRoute === 'Recipes' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Recipes' ? 'bold' : 'normal',
        }}
      />
      <DrawerItem
        label="Recipe"
        onPress={() => navigation.navigate('Recipe')}
        labelStyle={{
          color: activeRoute === 'Recipe' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Recipe' ? 'bold' : 'normal',
        }}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;