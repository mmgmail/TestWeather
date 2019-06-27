import React, { PureComponent } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ListItem } from 'react-native-elements'
import { Api } from 'AppApi';
const { getWeatherHourly, getWeatherHourlyByCoord } = Api;

export default class SearchScreen extends PureComponent {
  
  state = {
    isLoading: true,
    responseData: null
  };

  async componentDidMount() {
    await getWeatherHourly()
      .then(res => {
        this.setState({ responseData: res });
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, responseData } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'} 
            listViewDisplayed={false}
            fetchDetails={true}
            getDefaultValue={() => 'Kyiv'}
            onPress={async (data, details = null) => {
                const lat = Math.floor(details.geometry.location.lat);
                const lon = Math.floor(details.geometry.location.lng);
                await this.setState({ isLoading: true });
                await getWeatherHourlyByCoord(lat, lon)
                  .then(res => {
                    this.setState({ responseData: res });
                    this.setState({ isLoading: false });
                  });
              }
            }
            query={{
              key: 'AIzaSyCpTnZOCTTjid_Rej39OI9FsE2_LcMdPg8',
              language: 'en',
              types: '(cities)'
            }}
            debounce={200}
            styles={{
              row: {
                backgroundColor: 'white'
              }
            }}
          />
        </View>
        <View style={styles.list}>
          {isLoading ? <ActivityIndicator />
            : <ScrollView>
                {
                  responseData !== undefined && responseData.list.map((item, i) => (
                    <ListItem
                      key={item.dt}
                      title={item.dt_txt}
                      leftAvatar={{ source: { uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png` } }}
                      rightElement={<Text>{`${Math.floor(item.main.temp)}°C`}</Text>}
                    />
                  ))
                }
              </ScrollView>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    paddingTop: 45
  },
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0, right: 0,
    zIndex: 1
  }
});