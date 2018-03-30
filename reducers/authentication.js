import { AuthenticationActions } from '../actions';
import { REHYDRATE } from 'redux-persist';

const INITIAL_STATE = {
    currentUser: null,
    error: null,
    authHeaders: null
};

export default function(state = INITIAL_STATE, action) {
   
    let newState;
    console.log("ACTION: ", action);

    switch (action.type) {
        
        case AuthenticationActions.DO_LOGIN:
            newState = {...state};
            console.log("You are now logged in !");
            newState.currentUser = action.payload.currentUser;
            newState.authHeaders = action.payload.authHeaders;
            newState.error = null;
            return newState;
                
        case AuthenticationActions.LOGIN_ERROR:
            newState = {...state};
            console.log("Log in Error !!");
            // Be sure to reset currentUser to null and set the error
            newState.currentUser = null;
            newState.error = action.payload;
            newState.authHeaders = null;
            return newState;

        case AuthenticationActions.DO_LOGOUT:
            newState = {...state};
            console.log("Log out completed !");
            newState.currentUser = null;
            newState.authHeaders = null;
            newState.error = null;
            return newState;

        case AuthenticationActions.LOGOUT_ERROR:
            newState = {...state};
            console.log("Log out error !");
            return newState;

        // Redux persist action
        case REHYDRATE:
            newState = {...state};
            console.log(">>>>>>> Update state with the persistent one!!!");
            // Restore currentUser
            if (action.payload) {
                newState.currentUser = action.payload.currentUser;
                newState.authHeaders = action.payload.authHeaders;
                newState.error = action.payload.error;
            }                    
            console.log("Restored authentication: ", newState);
            return newState;

        default:
            return state;
    }
}