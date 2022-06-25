import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header() {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>Grocery App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 90,
    backgroundColor: '#076420',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginTop: 30,
  },
});
