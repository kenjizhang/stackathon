import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'back',
    });
  }, [navigation]);

  const signUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('ERROR', 'The passwords must match', [{ text: 'OK' }]);
    } else {
      createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
      <Text style={styles.titleText}>create an account</Text>
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
      />
      <TextInput
        placeholder='confirm password'
        style={styles.textInput}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Button title='sign up' onPress={signUp} />
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
