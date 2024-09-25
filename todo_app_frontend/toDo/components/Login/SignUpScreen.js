import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [username, onChangeUserName] = useState('');
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [passwordConfirm, onChangePasswordConfirm] = useState('');

  const bgImage = require('../../assets/background.png');
  const logoImage = require('../../assets/budgie.png');

  const handleSignUp = async () => {
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    /*
    const requestBody = {
      firstName,
      lastName,
      email,
      password,
    };
    */

    try {
      const response = await fetch('http://161.35.151.187:8000/api/appUsers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Sign Up Successful!");
        navigation.navigate('Login');
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      Alert.alert("Error", "Unable to complete sign-up. Please try again later.");
    }
  };

  return (
    <ImageBackground
      source={bgImage}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={logoImage} />
          </View>
          <Text style={styles.headerText}>Sign Up</Text>
          <TextInput
            style={styles.inputBox}
            value={username}
            onChangeText={onChangeUserName}
            placeholder={'Username'}
            placeholderTextColor={'#8C8C8C'}
            keyboardType={'default'}
          />
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={onChangeEmail}
            placeholder={'Email Address'}
            placeholderTextColor={'#8C8C8C'}
            keyboardType={'email-address'}
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
          <TextInput
            style={styles.inputBox}
            value={passwordConfirm}
            onChangeText={onChangePasswordConfirm}
            placeholder={'Confirm Password'}
            placeholderTextColor={'#8C8C8C'}
            keyboardType={'default'}
            secureTextEntry={true}
          />
          <View style={styles.loginButtonWrapper}>
            <Pressable 
              style={styles.loginButton}
              onPress={() => navigation.goBack()}>
              <Text style={styles.loginButtonText}>Back</Text>
            </Pressable>
            <Pressable style={styles.loginButton} onPress={handleSignUp}>
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
