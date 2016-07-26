'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#453F41'
    },
    shadow: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent'
    },
    bg: {
        flex: 1,
        marginTop: deviceHeight/1.75,
        backgroundColor: '#453F41',
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50,
        bottom: 0
    },
    input: {
        marginBottom: 10
    },
    btn: {
        opacity : 1,
        marginTop: 20,
        alignSelf: 'center'
    },
    hidden : {
       opacity : 0
    }
});
