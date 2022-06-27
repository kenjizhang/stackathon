import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import GroceryItem from './GroceryItem';
import GroceryInput from './GroceryInput';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';

const AddGrocery = (props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [groceries, setGroceries] = useState([]);

  // display modal when accessing grocery list
  function startAddGroceryHandler() {
    setModalIsVisible(true);
  }

  function endGroceryHandler() {
    setModalIsVisible(false);
  }

  // add grocery to existing list, close modal after
  async function addGroceryHandler(enteredGroceryText) {
    try {
      // create new collection with store name
      const docRef = await addDoc(
        collection(db, 'stores', props.route.params.storeId, 'groceries'),
        {
          name: enteredGroceryText,
        }
      );
      // update state to show all stores
      setGroceries((currentGroceries) => [
        ...currentGroceries,
        { name: enteredGroceryText, id: docRef.id },
      ]);
      endGroceryHandler();
      // console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // returns list without selected grocery
  async function deleteGrocery(id) {
    try {
      await deleteDoc(
        doc(db, 'stores', props.route.params.storeId, 'groceries', id)
      );
      setGroceries((currentGroceries) => {
        return currentGroceries.filter((grocery) => grocery.id !== id);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  useEffect(() => {
    async function updateGroceries() {
      // collection ref
      const colRef = await getDocs(
        collection(db, 'stores', props.route.params.storeId, 'groceries')
      );
      // fetch all docs from a collection if exists
      if (colRef) {
        let dbGroceries = [];
        colRef.forEach((doc) => {
          dbGroceries.push({ ...doc.data(), id: doc.id });
        });
        setGroceries(dbGroceries);
      }
    }
    updateGroceries();
  }, []);

  return (
    <View style={styles.appContainer}>
      <Button
        title='Add New Grocery'
        color='#154117'
        onPress={startAddGroceryHandler}
      />
      <GroceryInput
        visible={modalIsVisible}
        onAddGrocery={addGroceryHandler}
        onCancel={endGroceryHandler}
      />
      <View style={styles.groceriesContainer}>
        <FlatList
          data={groceries}
          renderItem={(groceryData) => {
            return (
              <GroceryItem
                text={groceryData.item.name}
                id={groceryData.item.id}
                onDeleteItem={deleteGrocery}
              />
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

export default AddGrocery;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#dbdbdb',
    width: '100%',
  },
  groceriesContainer: {
    flex: 5,
  },
});
