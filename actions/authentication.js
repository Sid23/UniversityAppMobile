
// Define actions used by action reducer
// each action has its own type to be identified and its payload (useful data)
import { AuthenticationActions } from "./"
import { serverRequest, getStudentDetails } from './shared';
import { fetchStudent } from "../utils/students";


// This function is based on action parameters used to identify a login or logout action
// Server request, actions types/payloads, changes based on it
export function userAuthentication(action, email="", password="", authHeaders={}) {
    //console.log(email, password, authHeaders)
    //(action) ? console.log("LOGIN action!") : console.log("LOGOUT action!")
    
    return function(dispatch) {

        return serverRequest(
            (action) ? 'auth/sign_in' : 'auth/sign_out',
            (action) ? 'post' : 'delete',
            // Header of the request
            {},
            // Body of the request
            (action) ? {'email': email, 'password': password} : {},
            authHeaders)
            .then(
                response => {
                    console.log("SERVER RESPONSE: ", response);

                    if(response.status >= 300) {
                        dispatch({
                            type: (action) ? Authentication.LOGIN_ERROR : Authentication.LOGOUT_ERROR,
                            payload: response.data.errors[0]
                        });
                        return;
                    }
                    let loginCredentials = (action) ? 
                        {
                            'access-token':response.headers['access-token'],
                            'client':response.headers['client'],
                            'expiry':response.headers['expiry'],
                            'token-type':response.headers['token-type'],
                            'uid':response.headers['uid']
                        } : {};

                    dispatch({
                        type: (action) ? AuthenticationActions.DO_LOGIN : AuthenticationActions.DO_LOGOUT,
                        payload: (action) ? {
                            currentUser: getStudentDetails(response),
                            authHeaders: loginCredentials
                        } : {}
                    })
                }
            ).catch(error => {
                console.log("Authentication error: ", error);
                //console.log(authHeaders)
                //console.log(email, password)
                dispatch({
                    type: (action) ? AuthenticationActions.LOGIN_ERROR : AuthenticationActions.DO_LOGOUT,
                    payload: "There has been an error contacting the server"
                })
            })
    }
}

// This action is dispatched every time the user home page is mounted.
// It requests again for the current user, and update it, to improve data consistency within the db on the backend
export function refreshCurrentUser(id, authHeaders) {

    return function(dispatch) {
        
        fetchStudent(id, authHeaders)
            .then(
                response => {

                    if(response.status >= 300)
                        // If there are some problems do nothing, current user is already present
                        return;

                    // Dispatch the update user actions, which update the current user
                    dispatch({
                        type: AuthenticationActions.UPDATE_CURRENT_USER,
                        payload: getStudentDetails(response)
                    })
                }
            )
            .catch(
                error => {
                    console.log("Current user update error: ", error);
                    if(response.status >= 300)
                        // If there are some problems do nothing, current user is already present
                        return;
                }
            )
        }
}