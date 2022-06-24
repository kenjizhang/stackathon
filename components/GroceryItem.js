import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function GroceryItem(props) {
  return (
    <Pressable
      onPress={props.onDeleteItem.bind(this, props.id)}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.groceryItem}>
        <Text style={styles.groceryText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  groceryItem: {
    margin: 7,
    padding: 8,
    borderRadius: 7,
    backgroundColor: 'green',
  },
  groceryText: {
    color: 'white',
  },
  pressedItem: {
    opacity: 0.5,
  },
});
