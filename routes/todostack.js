import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import todo from '../screens/todo';
import change from '../screens/change';

const screens = {
  todo: {
    screen: todo,
    navigationOptions: {
      title: 'TodoList',
      //headerStyle: { backgroundColor: '#eee' }
    }
  },
  change: {
    screen: change,
    navigationOptions: {
      title: 'change',
      //headerStyle: { backgroundColor: '#eee' }
    }
  },
}

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {   
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#FFA500', height: 60 },
  }
});

export default createAppContainer(AboutStack);