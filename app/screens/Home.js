import React, { useLayoutEffect, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Button,
  Alert,
  FlatList,
  Pressable,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import StoreItem from '../components/StoreItem';
import StoreInput from '../components/StoreInput';
import { db } from '../../firebase';
import {
  doc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';

const Home = ({ navigation }) => {
  const { currentUser } = auth;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [stores, setStores] = useState([]);

  // display modal when accessing grocery list
  function startAddStoreHandler() {
    setModalIsVisible(true);
  }

  function endStoreHandler() {
    setModalIsVisible(false);
  }

  // add grocery to existing list, close modal after
  async function addStoreHandler(enteredStoreText) {
    try {
      // create new collection with store name
      const docRef = await addDoc(collection(db, 'stores'), {
        name: enteredStoreText,
      });
      // update state to show all stores
      setStores((currentStores) => [
        ...currentStores,
        { name: enteredStoreText, id: docRef.id },
      ]);
      endStoreHandler();
      // console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // returns list without selected store
  async function deleteStore(id) {
    try {
      await deleteDoc(doc(db, 'stores', id));
      setStores((currentStores) => {
        return currentStores.filter((store) => store.id !== id);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  useEffect(() => {
    async function updateStores() {
      // collection ref
      const colRef = await getDocs(collection(db, 'stores'));

      // fetch all docs from a collection if exists
      if (colRef) {
        let dbStores = [];
        colRef.forEach((doc) => {
          dbStores.push({ ...doc.data(), id: doc.id });
        });
        setStores(dbStores);
      }
    }
    updateStores();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: !currentUser
        ? 'Stores'
        : currentUser.displayName
        ? `${currentUser.displayName}'s Stores`
        : 'Stores',
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
      <View style={styles.appContainer}>
        <Button
          title='Add New Store'
          color='#154117'
          onPress={startAddStoreHandler}
        />
        <StoreInput
          visible={modalIsVisible}
          onAddStore={addStoreHandler}
          onCancel={endStoreHandler}
        />
        <View style={styles.storesContainer}>
          <FlatList
            data={stores}
            renderItem={(storeData) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('AddGrocery', {
                      storeId: storeData.item.id,
                      name: storeData.item.name,
                    })
                  }
                >
                  <StoreItem
                    text={storeData.item.name}
                    id={storeData.item.id}
                    onDeleteItem={deleteStore}
                  />
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
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
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#dbdbdb',
    width: '90%',
  },
  storesContainer: {
    flex: 5,
  },
});
