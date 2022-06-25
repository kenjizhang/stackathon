import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Modal,
  Image,
} from 'react-native';

export default function GroceryInput(props) {
  const [enteredGroceryText, setEnteredGroceryText] = useState('');

  function groceryInputHandler(enteredText) {
    setEnteredGroceryText(enteredText);
  }

  function addGroceryHandler() {
    props.onAddGrocery(enteredGroceryText);
    setEnteredGroceryText('');
  }

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/GroceryCart.png')}
        />
        <TextInput
          placeholder='grocery name'
          style={styles.textInput}
          onChangeText={groceryInputHandler}
          value={enteredGroceryText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='Add Grocery'
              onPress={addGroceryHandler}
              color='#154117'
            />
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={props.onCancel} color='#e21818' />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3aa17d',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
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
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
    width: 100,
    marginHorizontal: 15,
  },
});
