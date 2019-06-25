import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  SafeAreaView,
} from 'react-navigation';
import MapView from 'react-native-maps';

export default class MapScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    const banner = navigation.getParam('banner');

    return (
      <View style={{ flex: 1 }}>
        
        <MapView
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});