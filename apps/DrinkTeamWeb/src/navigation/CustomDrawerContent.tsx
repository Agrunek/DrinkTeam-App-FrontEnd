import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../hooks/useAuth';


function CustomDrawerContent(props) {
  const theme = useTheme();
  const { state, navigation } = props;
  const {user, logout} = useAuth();

  const activeRoute = state?.routeNames[state?.index] ?? (user ? 'Recipies' : 'Login');
  
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.colors.background }}>
      {!user && <DrawerItem
        label="Login"
        onPress={() => navigation.navigate('Login')}
        labelStyle={{
          color: activeRoute === 'Login' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Login' ? 'bold' : 'normal',
        }}
      />}
      {user && <DrawerItem
        label="Recipes"
        onPress={() => navigation.navigate('Recipes')}
        labelStyle={{
          color: activeRoute === 'Recipes' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Recipes' ? 'bold' : 'normal',
        }}
      />}
      {user &&<DrawerItem
        label="Recipe"
        onPress={() => navigation.navigate('Recipe')}
        labelStyle={{
          color: activeRoute === 'Recipe' ? theme.colors.primary : "white",
          fontWeight: activeRoute === 'Recipe' ? 'bold' : 'normal',
        }}
      />}
      {user &&<DrawerItem
        label="Logout"
        onPress={() => {logout();navigation.navigate('Login') }}
        labelStyle={{
          color:  "white",
          fontWeight: 'normal',
        }}
      />}
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;