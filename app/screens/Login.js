import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
} from 'react-native';
import { Input, Image, Icon } from '@rneui/themed';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        navigation.replace('Home');
      }
    });

    return unsubscribe;
  }, []);

  const signIn = () => {
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert(`${error}`, 'wrong email or password', [{ text: 'OK' }]);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
      <Text style={styles.titleText}>welcome 🙂</Text>
      <TextInput
        placeholder='email'
        style={styles.textInput}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder='password'
        style={styles.textInput}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Button title='login' onPress={signIn} />
      <Button
        title='register'
        onPress={() => navigation.navigate('Register')}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#dbdbdb',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    borderRadius: 6,
    color: '#082d4f',
    width: '100%',
    padding: 14,
  },
  titleText: {
    marginBottom: 50,
    fontSize: 20,
  },
});
