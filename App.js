/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

// Application imports (persistent state, navigation, redux store... and so on)
import { connect } from 'react-redux';

// Pages/Components imports
import Header from  './components/header/';
import Login from './components/login';

// import login action
import { userAuthentication } from './actions/authentication';


const HEADER_HEIGHT = 65;

class App extends Component {
  render() {

    return (

      <View style={styles.appContainer}>
        <View style={styles.headerContainer} props={{height: HEADER_HEIGHT}}>

          <Header />
        
        </View>

        <View style={styles.pageContainer}>

          {
            (!this.props.auth.currentUser && !this.props.auth.authHeaders) ? 
              <Login /> : <Button onPress={() => this.props.authtenticateUser(false, "", "", this.props.auth.authHeaders)} title="Log Out"/>
          } 

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
      authtenticateUser: (action, email, password, authHeaders) => dispatch(userAuthentication(action, email, password, authHeaders)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
****************** Styles definition
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
