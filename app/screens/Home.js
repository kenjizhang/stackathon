import React, { useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Button,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import AddGrocery from '../components/AddGrocery';

const Home = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Grocery App',
      headerStyle: { backgroundColor: '#29659e' },
      headerTitleStyle: { color: 'white' },
      headerTintStyle: 'black',
      headerBackTitle: 'back',
      headerRight: () => (
        <View style={{ marginRight: 20 }}>
          <Button color='white' title='logout' onPress={logout} />
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
    backgroundColor: '#e6e5d1',
  },
});
