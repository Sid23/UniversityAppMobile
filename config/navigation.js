import React from 'react';
import { StackNavigator } from 'react-navigation';

import App from '../app';


export default StackNavigator({
    HomeScreen: {
      screen: App,
    },
  });