import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TouchableHighlight,
} from 'react-native';

export default function StoreItem(props) {
  return (
    <View style={styles.storeItem}>
      <View style={styles.pressedItem}>
        <Text style={styles.storeText}>{props.text}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title='X'
          color='red'
          onPress={props.onDeleteItem.bind(this, props.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  storeItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 7,
    padding: 8,
    borderRadius: 7,
    backgroundColor: '#c0ddc2',
    borderColor: 'white',
    borderWidth: 1,
  },
  storeText: {
    color: 'black',
    fontSize: 18,
  },
  // storeTextPressed: {
  //   color: 'black',
  //   textDecorationLine: 'line-through',
  // },
  pressedItem: {
    width: '100%',
    justifyContent: 'center',
    flex: 7,
  },
  buttonContainer: {
    justifyContent: 'center',
    flex: 1,
    // height: '90%',
    // borderWidth: 2,
    // borderColor: 'red',
  },
});
