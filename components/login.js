import React, {Component} from 'react';
import { Platform, StyleSheet, TextInput, Text, View, Button, Modal } from 'react-native';
import { connect } from 'react-redux';

// import login action
import {userAuthentication} from '../actions/authentication';

class Login extends Component {

    constructor(props) {
        super(props);

        // Component state
        this.state = {user: "admin@libero.it", password: "password"};
    }

    doLogin = () => {
        console.log(`User, ${this.state.user}!`);
        console.log(`Password, ${this.state.password}`);
        console.log('Post User Login to the backend server');
        this.props.authtenticateUser(this.state.user, this.state.password)
    }

    // Check if a logged user is present, if yes, go to his home page
    componentDidUpdate() {
        if (this.props.auth.currentUser && this.props.auth.authHeaders) {
            this.props.navigation.navigate('Root')
        }
    }

    componentDidMount() {
        console.log("Init state", this.state)
        console.log("Init props", this.state)
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Next state", nextState)
        console.log("Next props", nextProps)
        return true
    }

    render () {

        console.log("------------- Render login")
        return (

            <View style={styles.loginContainer}>


                <Text style={styles.label}>Username</Text>
                <View style={styles.blockContainer}>
                    <TextInput onChangeText={(user) => this.setState({user})} style={styles.inputText} underlineColorAndroid='transparent' placeholder="enter email..." value={this.state.user}/>
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.blockContainer}>
                    <TextInput onChangeText={(password) => this.setState({password})} underlineColorAndroid='transparent' style={styles.inputText} placeholder="enter password..." secureTextEntry={true} value={this.state.password} />
                </View>

                <View style={{width: '30%', marginTop: 15}}>
                    <Button onPress={this.doLogin} title="Log In" />
                </View>

            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authtenticateUser: (email, password) => dispatch(userAuthentication(true, email, password)),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cce6ff'
    },
    blockContainer: {
        backgroundColor: 'white',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 15
    },
    inputText: {
        fontSize: 22,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical:5
    },
    label: {
        fontSize: 22,
        color: 'black'
    }
});
