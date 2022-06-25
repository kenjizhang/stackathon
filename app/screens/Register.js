import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'back',
    });
  }, [navigation]);

  const signUp = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
      <Text style={{ marginBottom: 50 }}>create an account1</Text>
      <TextInput
        placeholder='first name'
        style={styles.textInput}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <TextInput
        placeholder='last name'
        style={styles.textInput}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
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
      <Button title='sign up' color='white' onPress={signUp} />
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
    backgroundColor: '#3aa17d',
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
});
