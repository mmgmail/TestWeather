import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
  ScrollView,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

class MyNavScreen extends PureComponent {
  render() {
    const { navigation } = this.props;
    const banner = navigation.getParam('banner');

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView forceInset={{ horizontal: 'always' }}>
          <Text>{banner}</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const TabBarComponent = (props) => (<BottomTabBar {...props} />);

const MapTab = createStackNavigator({
  Home: {
    navigationOptions: {
      title: 'Map',
    },
    params: { banner: 'Map Screen' },
    path: '/',
    screen: MyNavScreen,
  }
});

const SearchTab = createStackNavigator({
  Settings: {
    navigationOptions: {
      title: 'Search',
    },
    params: { banner: 'Search Screen' },
    screen: MyNavScreen,
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

export default TabNavigator;