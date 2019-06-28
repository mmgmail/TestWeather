import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ListItem, Text } from 'react-native-elements'
import moment from 'moment';
import { Api } from 'AppApi';
const { getWeatherHourly, getWeatherHourlyByCoord } = Api;

export default class SearchScreen extends PureComponent {
  
  state = {
    isLoading: false,
    responseData: null
  };

  async componentDidMount() {
    const city = await this.props.navigation.getParam('city', false);
    if(city) {
      await this.setState({ isLoading: true });
      await getWeatherHourly(city)
        .then(res => {
          this.setState({ responseData: res });
          this.setState({ isLoading: false });
      });
    }
  }

  toMapScreen = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { isLoading, responseData } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'} 
            listViewDisplayed={false}
            fetchDetails={true}
            getDefaultValue={() => this.props.navigation.getParam('city', '')}
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
            : responseData
            ? <ScrollView>
                {
                  responseData !== undefined && responseData.list.map((item, i) => (
                    <ListItem
                      key={item.dt}
                      title={moment(item.dt_txt).format('dddd')}
                      subtitle={moment(item.dt_txt).format('DD MMM HH:00')}
                      leftAvatar={{ source: { uri: `http://openweathermap.org/img/w/${item.weather[0].icon}.png` } }}
                      rightElement={<Text h4>{`${Math.floor(item.main.temp)}°C`}</Text>}
                    />
                  ))
                }
              </ScrollView>
              : <View style={styles.centered}>
                  <Text style={styles.infoText}>{'Enter city for search weather'}</Text>
                </View>
          }
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{opacity: 0.7, ...styles.tabButtons}}
            onPress={this.toMapScreen}
          >
            <Text style={styles.tabButtonsText}>{'Map'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabButtons}
            disabled
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
  list: {
    paddingTop: 45,
    flex: 1
  },
  header: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0, right: 0,
    zIndex: 1
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
  },
  centered: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 20,
    color: 'lightgrey'
  }
});