'use strict';

import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
	sidebar: {
 		flex: 1,
        padding: 10,
        paddingRight: 0,
        paddingTop: 30,
 		backgroundColor: '#271D1D'
    },
		container: {
    flex: 1,
    paddingTop: 1,
    backgroundColor: '#F6F6F6'
  },
  newItem: {
    backgroundColor: '#FFFFFF',
    height: 42,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 20
  },
  offline: {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 5
  }
});
