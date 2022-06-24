import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GroceryItem from './components/GroceryItem';
import GroceryInput from './components/GroceryInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [groceries, setGroceries] = useState([]);

  function startAddGroceryHandler() {
    setModalIsVisible(true);
  }

  function endAddGroceryHandler() {
    setModalIsVisible(false);
  }

  function addGroceryHandler(enteredGroceryText) {
    setGroceries((currentGroceries) => [
      ...currentGroceries,
      { text: enteredGroceryText, id: Math.random().toString() },
    ]);
    endAddGroceryHandler();
  }

  function deleteGrocery(id) {
    setGroceries((currentGroceries) => {
      return currentGroceries.filter((grocery) => grocery.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button
          title='Add New Grocery'
          color='#154117'
          onPress={startAddGroceryHandler}
        />
        <GroceryInput
          visible={modalIsVisible}
          onAddGrocery={addGroceryHandler}
          onCancel={endAddGroceryHandler}
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
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  groceriesContainer: {
    flex: 5,
  },
});
