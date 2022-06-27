import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const RecipeContents = (props) => {
  return (
    <View style={styles.recipeContainer}>
      <Image
        style={styles.imgContainer}
        source={{ uri: `${props.route.params.photo}` }}
      />
      <Text style={styles.text}>Ingredients</Text>
      <View style={styles.boxText}>
        {props.route.params.ingredientsList.map((ingredient) => (
          <Text key={ingredient}>- {ingredient}</Text>
        ))}
      </View>
      <Text style={styles.text}>Recipe Link</Text>
      <View style={styles.boxText}>
        <Text>{props.route.params.recipeLink}</Text>
      </View>
    </View>
  );
};

export default RecipeContents;

const styles = StyleSheet.create({
  recipeContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#dfe0c7',
    alignItems: 'center',
  },
  imgContainer: {
    marginTop: 20,
    width: 280,
    height: 280,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  boxText: {
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    borderRadius: 6,
    color: '#082d4f',
    width: '100%',
    padding: 14,
    margin: 10,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
});
