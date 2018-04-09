import React, {Component} from 'react';
import { Platform, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

// import authentication actions
import { userAuthentication, refreshCurrentUser } from '../actions/authentication';

class StudentHome extends Component {

    constructor(props) {
        super(props);

        // Component state
        this.state = {
            userCourses: []
        };
    }

    doLogOut = () => {
        console.log('Post User Log Out to the backend server');
        this.props.userLogOut(this.props.auth.authHeaders)
    }

    componentDidMount() {
        console.log('Home page did mount');
        console.log('refreshing current user...');
        this.props.refreshCurrentUser(this.props.auth.currentUser.id, this.props.auth.authHeaders);
    }

    // Check if the logout succeeded
    componentDidUpdate() {
        if (!this.props.auth.currentUser && !this.props.auth.authHeaders) {
            // Go to the root navigator, currentUser will be null
            this.props.navigation.navigate('Root')
        }
    }

    render () {
        console.log("Rendering student home");

        // if the logOut succeded there is npo current user
        if (this.props.auth.currentUser) {
            return (
                <View style={styles.studentHomeContainer}>

                    <Text> GG </Text>
                    <Text> Ciao {this.props.auth.currentUser.name} !!! </Text>
                    <Button title="Log Out" onPress={this.doLogOut} />

                </View>
            )
        } else {
            return(<Text>...Logging Out...</Text>);
        }

    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userLogOut: (authHeaders) => dispatch(userAuthentication(false, null, null, authHeaders)), 
        refreshCurrentUser: (id, headers) => dispatch(refreshCurrentUser(id, headers))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(StudentHome);

const styles = StyleSheet.create({
    studentHomeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
