import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Button,
  TouchableHighlight,
} from 'react-native';

export default function GroceryItem(props) {
  const [pressed, setPressed] = useState(false);

  const isPressed = () => {
    !pressed ? setPressed(true) : setPressed(false);
  };

  return (
    <View style={styles.groceryItem}>
      <Pressable style={styles.pressedItem} onPress={isPressed}>
        <Text
          style={[
            { textDecorationLine: pressed ? 'line-through' : 'none' },
            styles.groceryText,
          ]}
        >
          {props.text}
        </Text>
      </Pressable>
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
  groceryItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 7,
    padding: 8,
    borderRadius: 7,
    backgroundColor: '#c0ddc2',
    borderColor: 'white',
    borderWidth: 1,
  },
  groceryText: {
    color: 'black',
    fontSize: 18,
  },
  groceryTextPressed: {
    color: 'black',
    textDecorationLine: 'line-through',
  },
  pressedItem: {
    // width: '90%',
    justifyContent: 'center',
    flex: 7,
  },
  buttonContainer: {
    justifyContent: 'center',
    flex: 1,
    height: '90%',
  },
});
