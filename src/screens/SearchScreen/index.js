import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  SafeAreaView,
} from 'react-navigation';

export default class MapScreen extends PureComponent {
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