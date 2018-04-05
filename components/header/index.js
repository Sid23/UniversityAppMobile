import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Platform,
  StyleSheet,
  Text,
  View, Button
} from 'react-native';

// Import login action
import {userAuthentication} from '../../actions/authentication';

class Header extends Component {

    doLogOut = () => {
        console.log('Post User Log Out to the backend server');
        this.props.authtenticateUser(this.props.auth.authHeaders)
        //this.setState({user: "", password: ""});
    }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.login}>

            </View>
            <View style={styles.title}>
                {
                    (this.props.auth.currentUser) ? <Button title="Log Out" onPress={this.doLogOut} /> : <Text />
                }
            </View>
            <View style={styles.menu}>
        
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
        authtenticateUser: (authHeaders) => dispatch(userAuthentication(false, authHeaders=authHeaders)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

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
