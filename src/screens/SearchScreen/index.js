import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ListItem, Text } from 'react-native-elements'
import moment from 'moment';
import { connect } from 'react-redux';
import { Api } from 'AppApi';
import { loadWeatherHourly, loadWeatherByCoord, resetParams } from 'AppRedux';

class SearchScreen extends PureComponent {

  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    const city = this.props.navigation.getParam('city', false);
    if(city) {
      return this.props.loadWeatherHourly(city);
    } else {
      return this.props.resetParams();
    }
  }

  toMapScreen = () => {
    this.props.navigation.navigate('Home');
  }

  render() {
    const { coordWeather, isLoading, error } = this.props;
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
            onPress={(data, details = null) => {
                const lat = Math.floor(details.geometry.location.lat);
                const lon = Math.floor(details.geometry.location.lng); 
                return this.props.loadWeatherByCoord(lat, lon);
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
            : coordWeather
            ? <ScrollView>
                {
                  coordWeather !== undefined && coordWeather.list.map((item, i) => (
                    <ListItem
                      key={item.dt}
                      title={moment(item.dt_txt).format('dddd')}
                      subtitle={moment(item.dt_txt).format('DD MMM HH:00')}
                      leftAvatar={{ source: { uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` } }}
                      rightElement={<Text h4>{`${Math.floor(item.main.temp)}°C`}</Text>}
                    />
                  ))
                }
              </ScrollView>
            : error
            ? <View style={styles.centered}>
                <Text style={{...styles.infoText, color: 'red'}}>{`Sorry, something went wrong!\n${error}`}</Text>
              </View>
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
    color: 'lightgrey',
    textAlign: 'center'
  }
});

SearchScreen.propTypes = {
  loadWeatherByCoord: PropTypes.func.isRequired
}

const mapStateToProps = (state, nextState) => {
  return {
    coordWeather: state.weather.coordWeather,
    isLoading: state.weather.isLoading,
    error: state.weather.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWeatherHourly: (city) => dispatch(loadWeatherHourly(city)),
    loadWeatherByCoord: (lat, lon) => dispatch(loadWeatherByCoord(lat, lon)),
    resetParams: () => dispatch(resetParams())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);