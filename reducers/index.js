// To support middlewares
import { combineReducers, createStore, applyMiddleware } from 'redux';
// To have store persistent (daved on disk)
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Is a middleware that manages async requests, when the action payload is a function (dispatch)
import thunk from 'redux-thunk';
// import login reducer
import AuthenticationReducer from './authentication';
import CoursesReducer from './courses';

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating


// Whitelist of what piece of state that has to be saved
const persistConfig = {
    // is the reducer we want to store
    key: 'auth',
    storage: storage,
    // is the currentUser contained into authenticatin reducer
    whitelist: ['currentUser', 'error', 'authHeaders']
};
// Create root reducer as combination of all reducers
const rootReducer = combineReducers({
    // Make this reducer persistent
    auth: persistReducer(persistConfig, AuthenticationReducer),
    courses: CoursesReducer
})

// Exports needed by index.js
export const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
)
export const persistor = persistStore(store);