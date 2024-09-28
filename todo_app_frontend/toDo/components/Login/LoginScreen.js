import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

export default function LoginScreen({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [loading, setLoading] = useState(false);

  const bgImage = require('../../assets/background.png');
  const logoImage = require('../../assets/budgie.png');

  // Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Convert timestamps to readable format
      const currentDateTime = new Date(currentTime * 1000).toLocaleString();
      const expirationDateTime = new Date(decodedToken.exp * 1000).toLocaleString();
      
      console.log('Current Time:', currentDateTime);
      console.log('Decoded Token Expiration Time:', expirationDateTime);
      console.log('Is Token Expired:', decodedToken.exp < currentTime);
      
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If token is invalid or decoding fails, assume it's expired
    }
  };  

  // Refresh the access token
  const refreshAccessToken = async () => {
    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      console.log("Refreshing acces token..");
      const response = await fetch('http://161.35.151.187:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        await SecureStore.setItemAsync('accessToken', result.access);
        console.log("Acces token refreshed!");
        return result.access;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  // Get the access token (refresh it if expired)
  const getAccessToken = async () => {
    let accessToken = await SecureStore.getItemAsync('accessToken');

    if (!accessToken || isTokenExpired(accessToken)) {
      try {
        console.log("Acces token expired.");
        accessToken = await refreshAccessToken();
      } catch (error) {
        console.error('Token refresh failed, please log in again');
        throw error;
      }
    }

    return accessToken;
  };

  // Check for authentication when the component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        if (token) {
          // If token is valid, navigate to the home screen
          navigation.navigate('NavBarController');
        }
      } catch (error) {
        console.log('User needs to login');
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://161.35.151.187:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const { access, refresh } = result;

        // Store the access and refresh tokens securely
        await SecureStore.setItemAsync('accessToken', access);
        await SecureStore.setItemAsync('refreshToken', refresh);

        // Navigate to the home screen
        navigation.navigate('NavBarController');
      } else {
        Alert.alert('Login Failed', result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={bgImage}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logoImage} />
          </View>
          <Text style={styles.headerText}>Login</Text>
          <TextInput
            style={styles.inputBox}
            value={username}
            onChangeText={onChangeUsername}
            placeholder={'Username'}
            placeholderTextColor={'#8C8C8C'}
            keyboardType={'default'}
          />
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={onChangePassword}
            placeholder={'Password'}
            placeholderTextColor={'#8C8C8C'}
            keyboardType={'default'}
            secureTextEntry={true}
          />
          <View style={styles.loginButtonWrapper}>
            <Pressable
              style={styles.loginButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.loginButtonText}>Back</Text>
            </Pressable>
            <Pressable
              style={[styles.loginButton, loading ? styles.disabledButton : null]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Logging In...' : 'Login'}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  logo: {
    height: 200,
    width: 600,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 36,
    padding: 20,
    color: '#000000',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    borderColor: '#000000',
    backgroundColor: '#EDEFEE',
  },
  loginButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  loginButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#81E8F9',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
