import React, {Component} from 'react';
import { Platform, StyleSheet, TextInput, Text, View, Button, Dimensions } from 'react-native';
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
        //this.setState({user: "", password: ""});
    }
/*
    componentDidUpdate() {
        // Stable situation, called every time after 
        if (this.props.authentication.loggedIn &&
            this.props.authentication.authenticationHeaders &&
            !this.props.authentication.error) {
                console.log("Go to student home page!!");
                console.log("props: ", this.props);
                // Access to the history object and navigate to the logged student page
                this.props.history.push(`/students/${this.props.authentication.currentUser.id}`);
            } else {
                console.log("Log in failed");
            }
    }
*/
    render () {
        return (

            <View style={styles.loginContainer}>

                <Text style={styles.label}>Username</Text>
                <View style={styles.blockContainer}>
                    <TextInput onChangeText={(user) => this.setState({user})} style={styles.inputText} placeholder="enter email..." value={this.state.user}/>
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.blockContainer}>
                    <TextInput onChangeText={(password) => this.setState({password})} style={styles.inputText} placeholder="enter password..." secureTextEntry={true} value={this.state.password} />
                </View>

                <View style={{width: 0.3 * Dimensions.get('window').width, marginTop: 15}}>
                    <Button onPress={this.doLogin} title="Log In" />
                </View>

            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authtenticateUser: (email, password) => dispatch(userAuthentication(true, email, password)),
    }
}
  
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockContainer: {
        backgroundColor: 'white',
        width: 0.8 * Dimensions.get('window').width,
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
