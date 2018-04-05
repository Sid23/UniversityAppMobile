import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import App from './App';
import Loading from './Loading';

// imports for store and persistent reducer
import { store, persistor } from './reducers'
// Wrap the application entry point whithin store and persistent state

class Base extends Component{

    render() {
        return(
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={<Loading />}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('UniversityAppMobile', () => Base);

