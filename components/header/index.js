import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button
} from 'react-native';

export default class Header extends Component {

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.login}>

            </View>
            <View style={styles.title}>

            </View>
            <View style={styles.menu}>
        
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    login: {
        //height: HEIGHT,
        flex: 1,
        backgroundColor: 'green'
    },
    title: {
        //height: HEIGHT,
        flex: 3,
        backgroundColor: 'powderblue'
    },
    menu: {
        //height: HEIGHT,
        flex: 1,
        backgroundColor: 'red'
    },
});
