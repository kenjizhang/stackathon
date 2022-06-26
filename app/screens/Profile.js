import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
} from 'firebase/auth';

export default function Profile({ navigation }) {
  const auth = getAuth();
  const { currentUser } = auth;
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'back',
    });
  }, [navigation]);

  const update = () => {
    // const promises = [];
    // if (password && password !== confirmPassword) {
    //   Alert.alert('ERROR', 'The passwords must match', [{ text: 'OK' }]);
    // } else {
    //   promises.push(updatePassword(currentUser, password));
    // }
    // promises.push(
    //   updateProfile(currentUser, {
    //     displayName: displayName,
    //   })
    // );
    // promises.push(updateEmail(currentUser, email));
    // Promise.all(promises).then(navigation.replace('Home'));
    updateProfile(currentUser, {
      displayName: displayName,
    }).then(navigation.replace('Home'));
  };

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
      <Text style={styles.titleText}>update your display name</Text>
      <TextInput
        placeholder='display name'
        style={styles.textInput}
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />
      {/* <TextInput
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
      /> */}
      <Button title='update' onPress={update} />
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
