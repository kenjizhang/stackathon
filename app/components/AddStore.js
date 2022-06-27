import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import StoreItem from './StoreItem';
import StoreInput from './StoreInput';
import { db } from '../../firebase';
import { getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';

const AddStore = ({ navigation }) => {
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
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // returns list without selected store
  function deleteStore(id) {
    setStores((currentStores) => {
      return currentStores.filter((store) => store.id !== id);
    });
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
        console.log(dbStores);
        setStores(dbStores);
      }
    }
    updateStores();
  }, []);

  return (
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
                // style={styles.pressedItem}
                onPress={() => navigation.navigate('AddGrocery')}
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
  );
};

export default AddStore;

const styles = StyleSheet.create({
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
