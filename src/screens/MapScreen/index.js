import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Api } from 'AppApi';

const { getWeather } = Api;

export default class MapScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      showMarker: false
    }

    getWeather().then(
      res => this.response = res
    );
  }

  onHandlerMarkerShow = () => {
    this.setState({ showMarker: true })
  }

  render() {
    // const { navigation } = this.props;

    const { showMarker } = this.state;

    return (
      <View style={{ flex: 1 }}>
        {
          Platform.OS === 'ios' ? null
          : <MapView
              style={styles.map}
              initialRegion={{
                latitude: 50.4020865,
                longitude: 30.61468031,
                latitudeDelta: 1,
                longitudeDelta: 1,
              }}
              onLongPress={this.onHandlerMarkerShow}
            >
              {!!showMarker && 
                <Marker
                  onPress={() => {}}
                  coordinate={{
                    latitude: 50.4020865,
                    longitude: 30.61468031,
                  }}
                  centerOffset={{ x: -18, y: -60 }}
                  anchor={{ x: 0.69, y: 1 }}
                  pinColor={'tomato'}
                >
                  <Callout style={styles.plainView}>
                    <View>
                      <Text>{ `${this.response.name}, ${Math.floor(this.response.main.temp)}°C` }</Text>
                      <Text>{ this.response.weather[0].description }</Text>
                    </View>
                  </Callout>
                </Marker>
              }
            </MapView>
        }
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
  plainView: {
    width: 'auto',
    padding: 10,
  },
});