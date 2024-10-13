import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

const LoginView = () => {
  const { colors } = useTheme(); // Access the theme colors

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={[styles.topSection, { backgroundColor: colors.primary }]}>
        <Text style={styles.headerText}>DRINK</Text>
        <Text style={styles.taglineText}>Craft with flair, drink with care!</Text>
      </View>

      {/* Middle Section */}
      <View style={[styles.middleSection, { backgroundColor: colors.background }]}>
        <Text style={styles.logoText}>LOGO</Text>
        <Text style={styles.loginText}>Login</Text>

        {/* Inputs */}
        <TextInput
          label="Login / Mail"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Password"
          mode="outlined"
          secureTextEntry={true}
          style={styles.input}
        />

        {/* Buttons */}
        <Button mode="contained" onPress={() => console.log('Login pressed')} style={styles.button}>
          LOGIN
        </Button>
        <Button mode="outlined" onPress={() => console.log('Register pressed')} style={styles.button}>
          REGISTER
        </Button>
      </View>

      {/* Bottom Section */}
      <TouchableOpacity onPress={() => console.log('Forgot password pressed')}>
        <Text style={styles.forgotText}>If you forgot your password click here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  taglineText: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
  },
  middleSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    color: '#ffffff',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 20,
    color: '#aaaaaa',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
  forgotText: {
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default LoginView;
