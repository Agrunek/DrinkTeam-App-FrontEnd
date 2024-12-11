import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginView from '../views/Login/LoginView';
import { useTheme } from 'react-native-paper';
import SearchView from '../views/Search/SearchView';
import CustomDrawerContent from './CustomDrawerContent';
import RecipeView from '../views/Recipe/RecipeView';
import AddRecipeView from '../views/AddRecipe/AddRecipeView';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        drawerStyle: {
          backgroundColor: theme.colors.background,
        },
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onBackground,
        drawerActiveBackgroundColor: theme.colors.secondaryContainer,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
      }}>
        <Drawer.Screen 
          name="Login" 
          component={LoginView} 
          options={{ title: 'Login' }} 
        />
        <Drawer.Screen 
          name="Recipes" 
          component={SearchView} 
          options={{ title: 'Recipes' }}
        />
         <Drawer.Screen 
          name="Recipe" 
          component={RecipeView} 
          options={{ title: 'Recipe' }}
        />
        <Drawer.Screen 
          name="addRecipe" 
          component={AddRecipeView} 
          options={{ title: 'addRecipe' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;