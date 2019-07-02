import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';
import { loadWeatherToday } from 'AppRedux';

class MapScreen extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      showMarker: false,
      region: {
        latitude: 50.4020865,
        longitude: 30.61468031
      }
    }
  }

  onHandlerMarkerShow = async () => {
    await this.setState({ showMarker: true });
    await setTimeout(() => {
      this.marker.showCallout();
    }, 10);
  }

  onHandlerMarkerHide = () => {
    this.setState({ showMarker: false });
  }

  toSearchWeatgerScreen = () => {
    this.props.navigation.navigate('Search');
  }

  render() {
    const { navigation, response } = this.props;
    const { showMarker, region } = this.state;
    const { latitude, longitude } = region;
    
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          onLongPress={this.onHandlerMarkerShow}
          ref={ref => this.map = ref}
        >
          {!!showMarker && 
            <Marker
              ref={ref => this.marker = ref}
              coordinate={{
                latitude,
                longitude
              }}
              centerOffset={{ x: -18, y: -60 }}
              anchor={{ x: 0.69, y: 1 }}
              pinColor={'tomato'}
            >
              <Callout style={styles.plainView}
                onPress={() => {
                  this.onHandlerMarkerHide()
                  navigation.navigate('Search', {
                    city: 'Kyiv'
                  });
                }}
              >
                <View>
                  <Text>{ `${response.name}, ${Math.floor(response.main.temp)}°C` }</Text>
                  <Text>{ response.weather[0].description }</Text>
                </View>
              </Callout>
            </Marker>
          }
        </MapView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.tabButtons}
            onPress={this.onHandlerMarkerHide}
          >
            <Text style={styles.tabButtonsText}>{'Map'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{opacity: 0.7, ...styles.tabButtons}}
            onPress={this.toSearchWeatgerScreen}
          >
            <Text style={styles.tabButtonsText}>{'Search Weather'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  plainView: {
    width: 'auto',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 20
  },
  tabButtons: {
    width: '48%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    backgroundColor: 'dodgerblue'
  },
  tabButtonsText: {
    fontSize: 16,
    color: 'white'
  }
});

const mapStateToProps = (state) => {
  console.log(state)
  return {
    response: state.weather.todayWeather
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWeatherToday: dispatch(loadWeatherToday())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);