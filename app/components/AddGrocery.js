import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import GroceryItem from './GroceryItem';
import GroceryInput from './GroceryInput';

const AddGrocery = () => {
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
  function addGroceryHandler(enteredGroceryText) {
    setGroceries((currentGroceries) => [
      ...currentGroceries,
      { text: enteredGroceryText, id: Math.random().toString() },
    ]);
    endGroceryHandler();
  }

  // returns list without selected grocery
  function deleteGrocery(id) {
    setGroceries((currentGroceries) => {
      return currentGroceries.filter((grocery) => grocery.id !== id);
    });
  }

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
                text={groceryData.item.text}
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
    width: '90%',
  },
  groceriesContainer: {
    flex: 5,
  },
});
