import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Modal,
  Image,
} from 'react-native';

export default function StoreInput(props) {
  const [enteredStoreText, setEnteredStoreText] = useState('');

  function storeInputHandler(enteredText) {
    setEnteredStoreText(enteredText);
  }

  function addStoreHandler() {
    props.onAddStore(enteredStoreText);
    setEnteredStoreText('');
  }

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/Store.png')}
        />
        <TextInput
          placeholder='store name'
          style={styles.textInput}
          onChangeText={storeInputHandler}
          value={enteredStoreText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title='Add Store'
              onPress={addStoreHandler}
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
