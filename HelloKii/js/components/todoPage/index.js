'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ListView,
  NetInfo,
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import { Container, Header, Title, Content, Text, Button, Icon } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { addItem } from '../../actions/items';
import theme from '../../themes/base-theme';
import styles from "./styles";
import Item from './item'
import {kii} from '../../../config';

class TodoPage extends Component {
    constructor(props) {
      super(props)
      kii.Kii.setLogging(true);
      this.state = {
        newItem: '',
        message: '',
        isLoaded: false
      };
      this.loadTodosBucket();
    }
    popRoute() {
        this.props.popRoute();
    }
    componentWillMount() {
        this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    }
    loadTodosBucket(){
      if(this.props.onlineItems.length > 0) {
        return;
      }
      var self = this;
      var bucket = kii.KiiUser.getCurrentUser().bucketWithName("todos");

      var allQuery = kii.KiiQuery.queryWithClause();

      function queryAll(bucket, query, userProc) {
        var queryRecurr = function(params) {
          var queryPerformed = params[0];
          var resultSet = params[1];
          var nextQuery = params[2];

          userProc(resultSet);
          if (nextQuery == null) {
            return Promise.resolve();
          }
          // There are more results (pages).
          // Execute the next query to get more results.
          return bucket.executeQuery(nextQuery).then(queryRecurr);
        };
        return bucket.executeQuery(query).then(queryRecurr);
      }

      // Execute the query
      queryAll(bucket, allQuery, function(records) {
        // do something with the results
        for (var i = 0; i < records.length; i++) {
          // do something with the object resultSet[i];
          var object = records[i];

          let id = object.get("id");
          let todoTitle = object.get("Title");
          let created = object.getCreated();
          console.log("found :"+todoTitle);
          let val= {
            id,
            title: todoTitle,
            time: created
          }
          self.props.addItem(val);

        }
        self.setState({ message: "objects loaded",isLoaded: true });
      }).catch(
        function(error) {
          var theBucket = error.target;
          var errorString = error.message;
          // Error handling
        }
      );
    }
    renderRow(rowData) {
      console.log(this.props.connected)
      return (
        <Item name={rowData.title}
              removable={this.props.connected}
              onRemove={() => this._remove(rowData.id)} />
      )
    }

    _add() {
      var accessToken = kii.KiiUser.getCurrentUser().getAccessToken();
      const id = Math.random().toString(36).substring(7);
      var self = this;
      let todoTitle = this.state.newItem;
      let val= {
        id,
        title: this.state.newItem,
        time: new Date().getTime()
      }
      var todoBucket = kii.KiiUser.getCurrentUser().bucketWithName("todos");
      var obj = todoBucket.createObject();
      obj.set("id", id);
      obj.set("Title",todoTitle)
      // 1. login user
      obj.save().then(
        function(theSavedObject) {
          var msg = todoTitle + ' is saved to Kii ...';
          self.setState({message: msg});
        }
      ).catch(
        function(error) {
          console.log("Error: " + error);
        }
      );
      this.props.addItem(val);
      this.setState({newItem: '',message:'saving to Kii ...'})

    }

    _remove(id) {
      itemsRef.child(id).remove()
    }

    render() {
      console.log('PROPS!')
      console.log(this.props)
      let items, readonlyMessage
      if(this.props.onlineItems == null) {
        items = [];
      }else {
        items = this.props.onlineItems;
      }


      readonlyMessage = <Text style={styles.offline}>{this.state.message}</Text>

        return (
            <Container theme={theme} style={{backgroundColor: '#565051'}}>
                <Header style={{backgroundColor: '#322A2A'}} foregroundColor="#fff">
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>

                    <Title>Todo Page</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>
                <View style={styles.container}>
                        {readonlyMessage}
                        <TextInput placeholder="Something To Do"
                                   style={styles.newItem}
                                   ref="newItem"
                                   editable={this.props.connected}
                                   value={this.state.newItem}
                                   onChangeText={(newItem) => this.setState({newItem})}
                                   onSubmitEditing={() => this._add()} />


                        <ListView
                          dataSource={this.dataSource.cloneWithRows(items)}
                          enableEmptySections={true}
                          renderRow={this.renderRow.bind(this)}
                        />
                </View>
            </Container>
        )
    }
}
function mapStateToProps(state) {
  return {
    onlineItems: state.items.onlineList
  }
}
function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        addItem: (itemData) => dispatch(addItem(itemData))
    }
}

export default connect(mapStateToProps, bindAction)(TodoPage);
