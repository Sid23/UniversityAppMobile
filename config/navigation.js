import React from 'react';
// React nativer navigation imports
import { StackNavigator, SwitchNavigator } from 'react-navigation';

// Pages/Components imports used for the navigation
import Root from  '../components/index';
import Login from '../components/login';
import CoursesList from '../components/coursesList';
import StudentHome from '../components/studentHome';

// Stack navigator used for authentication screens
const AuthNavigator = StackNavigator(
    { 
        Login: {
            screen: Login
        }
    }, {
        headerMode: 'none'
    }
);
  
  // App stack navigator (Current user already logged in)
const AppNavigator = StackNavigator(
    {
        StudentHome: {
            screen: StudentHome
        },
        CoursesList: {
            screen: CoursesList
        }
    }, {
        headerMode: 'none'
    }
);

// SwitchNavigator shows only ever show one screen at a time.
// when users sign in, we want to throw away the state of the authentication flow.
// When the "back" button is pressed we expect to not be able to go back to the authentication flow. 
export default SwitchNavigator({
      Root: Root,
      AppNavigator: AppNavigator,
      AuthNavigator: AuthNavigator
    }, {
        initialRouteName: 'Root',
    }
);