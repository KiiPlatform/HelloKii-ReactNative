'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DeviceEventEmitter, Dimensions, Image,Alert } from 'react-native';

import { Container, Content, InputGroup, Input, Button, Icon, View, Spinner } from 'native-base';
import { replaceRoute } from '../../actions/route';

import theme from '../../themes/base-theme';
import styles from './styles';
import {kii} from '../../../config';

class Login extends Component {

    constructor(props) {
        super(props);
        kii.Kii.setLogging(true);
        this.state = {
            visibleHeight: Dimensions.get('window').height,
            scroll: false,
            isLoading: false,
            password:"123ABC",
            username:"user_123456"
        };
    }

    replaceRoute(route) {

      this.state.isLoading = true;
        //this.props.replaceRoute(route);
    }
    authenticate(){
      if (this.state.isLoading) {
        return;
      }

      this.setState({ isLoading: true });
      var self = this;
      kii.KiiUser.authenticate(this.state.username, this.state.password).then(
        function(user) {
          self.setState({ isLoading: false });
          self.props.replaceRoute('home');
        },
        function(error) {
          self.setState({ isLoading: false });
          Alert.alert(
            'Login failed',
            'error =' + error,
            [
              {text: 'OK', onPress: () => console.log("failed")},
            ]
          );
        }
      );

    }

    render() {
        return (
            <Container theme={theme}>

                <View style={styles.container}>
                    <Content>
                        <Image source={require('../../../images/shadow.png')} style={styles.shadow}>

                            <View style={styles.bg}>
                                <Spinner color="red" style={ this.state.isLoading ? '' : styles.hidden } />
                                <InputGroup style={styles.input}>
                                    <Icon name="ios-person" />
                                    <Input
                                        placeholder="EMAIL/USERNAME"
                                        onChangeText={(username) => this.setState({username})}

                                    />
                                </InputGroup>
                                <InputGroup style={styles.input}>
                                    <Icon name="ios-unlock-outline" />
                                    <Input
                                        placeholder="PASSWORD"
                                        secureTextEntry={true}
                                        onChangeText={(password) => this.setState({password})}

                                    />
                                </InputGroup>

                                <Button style={styles.btn} textStyle={{color: '#fff'}} onPress={() => this.authenticate()}>
                                    Login
                                </Button>
                            </View>
                        </Image>
                    </Content>
                </View>
            </Container>
        )
    }
}

function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindActions)(Login);
