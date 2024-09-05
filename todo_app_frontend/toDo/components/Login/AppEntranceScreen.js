import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppEntranceScreen() {
  const [loggedIn, onLogin] = useState(false);
  const [signedUp, onSignUp] = useState(false);

  const bgImage = require('../../assets/background.png');
  const logoImage = require('../../assets/corgi.png');

  return (
    <NavigationContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            
            {/* Entrance screen */}
            <Stack.Screen name="Entrance">
              {({ navigation }) => (
                <ImageBackground
                  source={bgImage}
                  resizeMode="cover"
                  style={styles.backgroundImage}>
                  <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.inner}>
                      <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={logoImage} />
                      </View>
                      <Text style={styles.regularText}>Hello</Text>
                      <Pressable
                        onPress={() => navigation.navigate('Login')}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                      </Pressable>
                      <Pressable
                        onPress={() => navigation.navigate('SignUp')}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                      </Pressable>
                    </View>
                  </ScrollView>
                </ImageBackground>
              )}
            </Stack.Screen>

            {/* Login screen */}
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* SignUp screen */}
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140,
    paddingBottom: 10,
  },
  logo: {
    height: 200,
    width: 600,
    resizeMode: 'contain',
  },
  regularText: {
    fontSize: 32,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
    marginVertical: 8,
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 50,
    backgroundColor: '#F2BF91',
    borderColor: '#F2BF91',
    borderWidth: 1,
    borderRadius: 20,
  },
  buttonText: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 24,
  },
});
