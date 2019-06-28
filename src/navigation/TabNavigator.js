import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { MapScreen, SearchScreen } from 'AppScreens';

const TabNavigator = createStackNavigator(
  {
    Home: {
      navigationOptions: {
        title: 'Map',
      },
      params: { banner: 'Map Screen' },
      path: '/',
      screen: MapScreen,
    },
    Search: {
      navigationOptions: {
        title: 'Search Weather',
      },
      params: { banner: 'Search Weather Screen' },
      screen: SearchScreen,
    },
  }
);

export {
  TabNavigator
}