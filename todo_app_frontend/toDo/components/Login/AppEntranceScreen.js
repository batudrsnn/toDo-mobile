import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
  View,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

export default function AppEntranceScreen() {
    const [loggedIn, onLogin] = useState(false);
    const [signedUp, onSignUp] = useState(false);
    
    const logoImage = loggedIn
        ? require('../../assets/budgie.png')
            : signedUp
                ? require('../../assets/budgie.png')
                : require('../../assets/corgi.png')

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground 
                    source={require("../../assets/background.png")} 
                    resizeMode="cover" 
                    style={styles.backgroundImage}>
                    <ScrollView 
                        style={styles.inner}
                        contentContainerStyle={styles.contentContainer}>
                        <View style={styles.logoContainer}>
                            <Image
                                style={styles.logo}
                                source={logoImage}
                            />
                        </View>
                        {/* Sign Up screen */}
                        {signedUp && 
                            <SignUpScreen></SignUpScreen>
                        }
                        {/* Login screen */}
                        {loggedIn && 
                            <LoginScreen></LoginScreen>
                        }
                        {/* Main screen */}
                        {!loggedIn && !signedUp && (
                            <>
                                <Text style={styles.regularText}>Hello</Text>
                                <Pressable onPress={() => {
                                        // Delay
                                        setTimeout(() => {
                                            onLogin(!loggedIn);
                                        }, 100);
                                    }}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </Pressable>
                                <Pressable onPress={() => {
                                        // Delay
                                        setTimeout(() => {
                                            onSignUp(!signedUp);
                                        }, 100);
                                    }}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </Pressable>
                            </>
                        )}
                    </ScrollView>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
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
        paddingBottom: 140,
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
