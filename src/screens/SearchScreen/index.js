import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  navigation,
} from 'react-navigation';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class MapScreen extends PureComponent {
  
  state = {
    region: {},
  };

  componentDidUpdate() {
    this.getCurrentLocation().then(data => {
      this.updateLocation({
        latitude: data.latitude,
        longitude: data.longitude,
      });;
    });
  }

  getCurrentLocation = () => {
    return new Promise(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (data) => resolve(data.coords),
            (err) => reject(err)
          );
        }
    );
  }

  updateLocation(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  onChangeLocation(region) {
    this.setState({ region });
    setTimeout(() => {
      this.props.navigation.navigate('MapTab', {
        region: {
          latitude: region.lat,
          longitude: region.lng,
        }
      });
    }, 10);
  }

  render() {
    const { navigation } = this.props;
    const banner = navigation.getParam('banner');
    return (
      <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={false}
          autoFocus={true}
          returnKeyType={'search'} 
          listViewDisplayed={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
              this.onChangeLocation(details.geometry.location);
            }
          }
          query={{
            key: 'AIzaSyCpTnZOCTTjid_Rej39OI9FsE2_LcMdPg8',
            language: 'en',
            types: '(cities)'
          }}
          debounce={200}
        />
        
      </View>
    );
  }
}