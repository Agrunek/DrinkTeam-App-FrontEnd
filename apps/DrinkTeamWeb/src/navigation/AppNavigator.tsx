import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginView from '../views/Login/LoginView';
import HomeView from '../views/Home/HomeView';


const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen 
          name="Login" 
          component={LoginView} 
          options={{ headerShown: false }} 
        />
        <Drawer.Screen 
          name="Home" 
          component={HomeView} 
          options={{ title: 'Home' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;