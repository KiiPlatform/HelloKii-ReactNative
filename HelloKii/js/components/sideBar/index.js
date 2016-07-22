'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Content, Text, List, ListItem } from 'native-base';
import { closeDrawer } from '../../actions/drawer';
import { replaceOrPushRoute } from '../../actions/route';

import styles from "./styles";

class SideBar extends Component {

    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    render(){
        return (
            <Content style={styles.sidebar} >
                <List foregroundColor={"white"}>
                    <ListItem onPress={() => this.navigateTo('home')} >
                        <Text>Home</Text>
                    </ListItem>
                    <ListItem onPress={() => this.navigateTo('todoPage')} >
                        <Text>Todo Page</Text>
                    </ListItem>
                </List>
            </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
