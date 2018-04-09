/**
 * Component used as Root of the navigator
 * It mainly navigate to the correct page depending on currentUser (if it is loggedIn or not)
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';


// Application imports (persistent state, navigation, redux store... and so on)
import { connect } from 'react-redux';

class Root extends Component {

  static navigationOptions = {
    title: 'Root',
  };

  constructor(props) {
    super(props);
    console.log("Navigation root constructor")

  }

  componentDidMount(){
    this.props.navigation.navigate((this.props.auth.currentUser) ? 'AppNavigator' : 'AuthNavigator');
  }

  render() {
    
    console.log("Navigation root render")
    return (
        <View style={ {
            flex: 1,
            backgroundColor: 'orange'
          }}>  
        </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps, null)(Root)