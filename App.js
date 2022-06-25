import 'react-native-gesture-handler';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Home from './app/screens/Home';
import AddGrocery from './app/components/AddGrocery';
// import GroceryItem from './app/GroceryItem';
// import GroceryInput from './app/GroceryInput';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#076420' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  // const [modalIsVisible, setModalIsVisible] = useState(false);
  // const [groceries, setGroceries] = useState([]);

  // // display modal when accessing grocery list
  // function startAddGroceryHandler() {
  //   setModalIsVisible(true);
  // }

  // function endGroceryHandler() {
  //   setModalIsVisible(false);
  // }

  // // add grocery to existing list, close modal after
  // function addGroceryHandler(enteredGroceryText) {
  //   setGroceries((currentGroceries) => [
  //     ...currentGroceries,
  //     { text: enteredGroceryText, id: Math.random().toString() },
  //   ]);
  //   endGroceryHandler();
  // }

  // // returns list without selected grocery
  // function deleteGrocery(id) {
  //   setGroceries((currentGroceries) => {
  //     return currentGroceries.filter((grocery) => grocery.id !== id);
  //   });
  // }

  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='AddGrocery' component={AddGrocery} />
      </Stack.Navigator>
      {/* <View style={styles.appContainer}>
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
      </View> */}
    </NavigationContainer>
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
