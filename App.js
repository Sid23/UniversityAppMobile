/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

// component to render until state is not restored
import Loading from './Loading';

// imports for store and persistent reducer
import { store, persistor } from './reducers'
// Wrap the application entry point whithin redux store and persistent state (for the authentication)

// React nativer navigation imports
import { StackNavigator, SwitchNavigator } from 'react-navigation';

// Import header component
import Header from './components/header';
import Login from './components/login';

// Application imports (persistent state, navigation, redux store... and so on)
import { connect } from 'react-redux';

// import login action
import { userAuthentication } from './actions/authentication';

// import root navigator
import Navigator from './config/navigation'

const HEADER_HEIGHT = 58;

export default class App extends Component {

  componentDidMount() {
    console.log("oooooooooo APP DID MOUNT ooooooooooo")
    return false
  }

  componentWillUnmount() {
    console.log("llllllll APP WILL UNMOUNT llllllllll")
  }

  render() {
    
    console.log("Render app edit")
    return (
        <Provider store={store}>
          <PersistGate persistor={persistor} loading={<Loading />}>

            <View style={styles.appContainer}>
              <View style={styles.headerContainer} props={{height: HEADER_HEIGHT}}>

                <Header />

              </View>

              <View style={styles.pageContainer}>
                <Navigator />
              </View>

            </View> 

        </PersistGate>
      </Provider>
      
    );
  }
}

/*
<Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>

          <View style={styles.appContainer}>
            <View style={styles.headerContainer} props={{height: HEADER_HEIGHT}}>

              <Header />

            </View>

            <View style={styles.pageContainer}>

              <Navigator />
                
            </View>

          </View> 

        </PersistGate>
      </Provider>
    
*/

/*
****************** Styles definition *********************
*/
const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    backgroundColor: 'blue'
  },
  pageContainer: {
    flex: 1,
    backgroundColor: 'orange'
  }
});