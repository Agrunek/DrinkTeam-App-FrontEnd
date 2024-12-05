import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';
import { useAuthContext } from '../../middleware/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginView = () => {
  const {register, login} = useAuthContext()
  const theme = useTheme();
  const { colors } = theme;
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      await login({ email, password });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    topSection: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    headerText: {
      fontSize: 36,
      color: colors.onPrimary,
      fontWeight: 'bold',
    },
    taglineText: {
      fontSize: 16,
      color: colors.onPrimary,
      marginTop: 10,
    },
    middleSection: {
      flex: 3,
      paddingVertical: 40,
      paddingHorizontal: 20,
      marginTop: -20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    logoText: {
      fontSize: 34,
      color: colors.onBackground,
      marginBottom: 20,
    },
    loginText: {
      color: colors.primary,
      fontSize: 24,
      marginBottom: 20,
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      marginBottom: 15,
      backgroundColor: colors.onSecondaryContainer,
    },
    button: {
      width: '100%',
      marginVertical: 10,
    },
    registerButton: {
      borderWidth: 2,
    },
    forgotSection: {
      marginTop: 20,
      backgroundColor: colors.background,
    },
    forgotText: {
      color: colors.primary,
      textAlign: 'center',
      textDecorationLine: 'underline',
      marginTop: 20,
      paddingBottom: 7,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.topSection}>
            <Text style={styles.headerText}>DRINK</Text>
            <Text style={styles.taglineText}>Craft with flair, drink with care!</Text>
          </View>

          <View style={[styles.middleSection]}>
            <Text style={styles.logoText}>LOGO</Text>
            <Text style={styles.loginText}>Login</Text>

            <TextInput
              onChangeText={(text) => setTestStr(text)}
              label="Login / Mail"
              mode="outlined"
              textColor={colors.primary}
              style={styles.input}
            />
            <TextInput
              label="Password"
              mode="outlined"
              textColor={colors.primary}
              secureTextEntry={true}
              style={styles.input}
            />

            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('Recipes')}
              style={styles.button}
              contentStyle={{ height: 70 }}
              labelStyle={{ fontWeight: 'bold' }}
            >
              LOGIN
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Recipes')}
              style={[styles.button, styles.registerButton]}
              contentStyle={{ height: 50 }}
              labelStyle={{ fontWeight: 'bold' }}
            >
              REGISTER
            </Button>

            <TouchableOpacity onPress={() => console.log("")} style={styles.forgotSection}>
              <Text style={styles.forgotText}>If you forgot your password click here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginView;
