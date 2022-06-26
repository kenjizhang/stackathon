import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import AddGrocery from '../components/AddGrocery';
import AddStore from '../components/AddStore';

const Home = ({ navigation }) => {
  const { currentUser } = auth;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !currentUser
        ? 'List'
        : currentUser.displayName
        ? `${currentUser.displayName}'s List`
        : 'List',
      headerStyle: { backgroundColor: '#3aa17d' },
      headerTitleStyle: { color: 'white' },
      headerTintStyle: 'black',
      headerBackTitle: 'back',
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button color='white' title='logout' onPress={logout} />
        </View>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Button
            color='white'
            title='profile'
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      ),
    });
  }, []);

  const logout = () => {
    try {
      signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.groceryContainer}>
      <AddGrocery />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  groceryContainer: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
    backgroundColor: '#dbdbdb',
    alignItems: 'center',
  },
});
