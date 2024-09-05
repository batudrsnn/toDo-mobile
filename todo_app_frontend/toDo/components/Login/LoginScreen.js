import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const bgImage = require('../../assets/background.png');
  const logoImage = require('../../assets/budgie.png');

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
            <Text style={styles.headerText}>Login</Text>
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
            <View style={styles.loginButtonWrapper}>
              <Pressable
                style={styles.loginButton}
                onPress={() => navigation.goBack()}>
                <Text style={styles.loginButtonText}>Back</Text>
              </Pressable>
              <Pressable style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
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
  loginButtonText: {
    color: '#000000',
    fontSize: 16,
  },
});
