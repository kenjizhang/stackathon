import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Profile from './app/screens/Profile';
import Home from './app/screens/Home';
import AddGrocery from './app/screens/AddGrocery';
import Recipes from './app/screens/Recipes';
import RecipeContents from './app/screens/RecipeContents';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: '#3aa17d' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen
          name='AddGrocery'
          component={AddGrocery}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen name='Recipes' component={Recipes} />
        <Stack.Screen
          name='RecipeContents'
          component={RecipeContents}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
