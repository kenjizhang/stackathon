import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TouchableHighlight,
} from 'react-native';

export default function RecipeItem(props) {
  return (
    <View style={styles.storeItem}>
      <View style={styles.pressedItem}>
        <Text style={styles.storeText}>{props.text}</Text>
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
    backgroundColor: '#dcc8b2',
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
});
