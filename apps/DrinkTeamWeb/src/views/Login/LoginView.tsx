import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme, Text } from 'react-native-paper';

const LoginView = () => {
  const theme = useTheme();
  const { colors } = theme;

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
      backgroundColor: colors.secondary, // Ensure the same background as the middle section
    },
    forgotText: {
      flex: 1,
      color: colors.primary,
      textAlign: 'center',
      textDecorationLine: 'underline',
      marginTop: 20,
      paddingBottom: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.headerText}>DRINK</Text>
        <Text style={styles.taglineText}>Craft with flair, drink with care!</Text>
      </View>

      <View style={[styles.middleSection]}>
        <Text style={styles.logoText}>LOGO</Text>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
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
          onPress={() => console.log('Login pressed')}
          style={styles.button}
          contentStyle={{ height: 70 }}
          labelStyle={{ fontWeight: 'bold' }}
        >
          LOGIN
        </Button>

        <Button
          mode="outlined"
          onPress={() => console.log('Register pressed')}
          style={[styles.button, styles.registerButton]}
          contentStyle={{ height: 50 }}
          labelStyle={{ fontWeight: 'bold' }}
        >
          REGISTER
        </Button>

        <TouchableOpacity onPress={() => console.log('Forgot password pressed')} style={styles.forgotSection}>
          <Text style={styles.forgotText}>If you forgot your password click here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginView;
