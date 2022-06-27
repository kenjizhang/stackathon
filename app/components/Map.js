import { useState } from 'react';
import MapView, { Marker, Callout, Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Map() {
  const [pin, setPin] = useState({ latitude: 34.0522, longitude: -118.2437 });
  const [region, setRegion] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
  });

  return (
    <View style={{ marginTop: 20, flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'AIzaSyA0m3ZZ5Q93sEWFG5JoQf7ahJNlIgsANtk',
          language: 'en',
          components: 'country:us',
          types: 'store',
          radius: 30000,
          location: `${(region.latitude, region.longitude)}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            width: '100%',
            zIndex: 1,
          },
          listView: { backgroundColor: 'white' },
        }}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 34.0522,
          longitude: -118.2437,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider='google'
      >
        <Marker
          coordinate={{ latitude: 34.0522, longitude: -118.2437 }}
          pinColor='red'
          draggable={true}
          onDragStart={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>I'm here!</Text>
          </Callout>
        </Marker>
        <Circle center={pin} radius={3000} fillColor='#f5f5f52e' />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
