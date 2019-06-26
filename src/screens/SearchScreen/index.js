import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Api } from 'AppApi';
const { getWeatherHourly } = Api;

export default class SearchScreen extends PureComponent {
  
  state = {
    region: {
      latitude: 50.4020865,
      longitude: 30.61468031,
    }
  };

  async componentDidMount() {
    await getWeatherHourly().then(res => this.response = res);
    await console.log(this.response)
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
        <ScrollView>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row'
  },
  searchInput: {
    position: 'absolute',
    width: '100%'
  }
});