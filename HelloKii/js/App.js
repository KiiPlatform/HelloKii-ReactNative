'use strict';

import AppNavigator from './AppNavigator';
import React,{ Component } from "react";
import { StyleSheet, Text, View, AppState} from 'react-native';

class App extends Component {
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(state:string) {
        if (state === 'active') {
          // do nothing
        }
    }
    render() {
        return (
            <AppNavigator store={this.props.store} />
        );
    }
}

export default App
