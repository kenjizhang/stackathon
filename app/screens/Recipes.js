import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import RecipeItem from '../components/RecipeItem';

const Recipes = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [response, setResponse] = useState();
  const [input, setInput] = useState('');

  function inputHandler(enteredText) {
    setInput(enteredText);
  }

  const getContent = () => {
    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=3dc96a1a&app_key=%20643bda0476396e150253cd3a4b548753%09`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          const info = result.hits;
          setResponse(info);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
    if (isLoading) {
      return <ActivityIndicator size='large' />;
    }
    if (error) {
      return <Text>{error}</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.groceryContainer}>
      <View style={styles.appContainer}>
        <TextInput
          placeholder='cravings here'
          style={styles.textInput}
          onChangeText={inputHandler}
          value={input}
        />
        <View style={styles.button}>
          <Button title='Search' onPress={getContent} color='#154117' />
        </View>
        <View style={styles.storesContainer}>
          <FlatList
            data={response}
            renderItem={(obj) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('RecipeContents', {
                      ingredientsList: obj.item.recipe.ingredientLines,
                      recipeLink: obj.item.recipe.url,
                      name: obj.item.recipe.label,
                      photo: obj.item.recipe.image,
                    })
                  }
                >
                  <RecipeItem
                    text={obj.item.recipe.label}
                    id={obj.item.recipe.label}
                  />
                </Pressable>
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  groceryContainer: {
    flex: 1,
    paddingTop: 55,
    paddingHorizontal: 16,
    backgroundColor: '#dbdbdb',
    alignItems: 'center',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#dbdbdb',
    width: '90%',
  },
  storesContainer: {
    flex: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: 'white',
    borderRadius: 6,
    color: '#082d4f',
    width: '100%',
    padding: 14,
    marginTop: 10,
  },
  button: {
    marginBottom: 10,
  },
});
