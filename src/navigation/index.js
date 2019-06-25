import React from 'react';
import { Platform } from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import { TabNavigator } from "AppScreens"

const AppScreensInfo = {
  TabNavigator: {
    description: 'Custom tabs with tab router',
    name: 'Custom Tabs',
  }
};

const AppRoutes = {
  TabNavigator,
};


const AppNavigator = createAppContainer(
	createStackNavigator(
		{
			...AppRoutes,
			Index: {
				screen: TabNavigator,
			},
		},
		{
			headerMode: 'none',
			initialRouteName: 'Index',
			mode: Platform.OS === 'ios' ? 'modal' : 'card',
		}
	)
);

export { 
	AppNavigator 
}