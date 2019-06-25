import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { MapScreen, SearchScreen } from 'AppScreens';

const MapTab = createStackNavigator({
  Home: {
    navigationOptions: {
      title: 'Map',
    },
    params: { banner: 'Map Screen' },
    path: '/',
    screen: MapScreen,
  }
});

const SearchTab = createStackNavigator({
  Settings: {
    navigationOptions: {
      title: 'Search',
    },
    params: { banner: 'Search Screen' },
    screen: SearchScreen,
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    MapTab: {
      navigationOptions: {
        tabBarLabel: 'Home',
      },
      path: '/',
      screen: MapTab,
    },
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: true,
      showIcon: false,
      activeTintColor: 'white',
      inactiveTintColor: 'rgba(255,255,255,0.5)',
      labelStyle: {
        fontSize: 16
      },
      tabStyle: {
        padding: 15,
        alignSelf: 'flex-start'
      },
      activeBackgroundColor: 'tomato',
      inactiveBackgroundColor: 'rgba(255,99,71,0.5)',
    },
  }
);

export {
  TabNavigator
}