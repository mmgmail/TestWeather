import React, { PureComponent } from 'react';
import {
  Text,
  View,
} from 'react-native';
import {
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import {
  SafeAreaView,
} from 'react-navigation';

export default class HomeScreen extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <NativeViewGestureHandler>
					<SafeAreaView>
						<Text>{'Home screen'}</Text>
					</SafeAreaView>
        </NativeViewGestureHandler>
      </View>
    );
  }
}