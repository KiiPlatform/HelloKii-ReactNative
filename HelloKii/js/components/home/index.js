'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Header, Title, Content, View, Text, Button, Icon } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { openDrawer } from '../../actions/drawer';
import { replaceRoute } from '../../actions/route';

import theme from '../../themes/base-theme';
import styles from './styles';

class Home extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container style={{backgroundColor: '#565051'}}>
                <Header style={{backgroundColor: '#322A2A'}} foregroundColor="#fff" >
                    <Button transparent onPress={() => this.replaceRoute('login')}>
                        <Icon name="ios-power" />
                    </Button>

                    <Title>Home</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>

                <Content>
                    <Grid style={{marginTop: 20}}>
                        <Row>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    React Native HelloKii
                                </Text>
                            </View>
                        </Row>
                        <Row>
                            <View style={styles.row}>
                                <Text style={styles.text}>
                                    Redux
                                </Text>
                            </View>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
