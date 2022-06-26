import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import StoreItem from './StoreItem';
import StoreInput from './StoreInput';

const AddStore = () => {
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
  function addStoreHandler(enteredStoreText) {
    setStores((currentStores) => [
      ...currentStores,
      { text: enteredStoreText, id: Math.random().toString() },
    ]);
    endStoreHandler();
  }

  // returns list without selected grocery
  function deleteStore(id) {
    setStores((currentStores) => {
      return currentStores.filter((store) => store.id !== id);
    });
  }

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
              <StoreItem
                text={storeData.item.text}
                id={storeData.item.id}
                onDeleteItem={deleteStore}
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
