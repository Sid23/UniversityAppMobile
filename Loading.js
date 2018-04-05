import React, { Component } from 'react';
import { Platform, StyleSheet, Text, ActivityIndicator, View } from 'react-native';

export default class App extends Component {

    render() {
        return(
            <View>
                <Text>Loading...</Text>
                <ActivityIndicator size="small" color="#00ff00" />
            </View>
        );
    };
}