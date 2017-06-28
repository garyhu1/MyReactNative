/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
//'use strict';

import React, { Component } from 'react';
import {
	AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');



var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


class Input extends Component{

    handleUpdateChange(text) {
        RCTDeviceEventEmitter.emit('change',text);
    }


  render() {

    return (
      <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF'}}>
        <TextInput onChangeText={(text) => this.handleUpdateChange(text)} style={{ width : 200, height: 40, borderColor: 'gray', borderWidth: 1}} />
      </View>
    );
  }
}




class ShowText extends Component{
	
	

    getInitialState(){
      return {
        text : ''
      }
    }

    componentDidMount(){
      var me = this;
      RCTDeviceEventEmitter.addListener('change',function(text){
         me.setState({
          text : text
         })
      })
    }


    render() {
        return (
          <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF'}}>
            <Text>{this.state.text}</Text>
          </View>
        );
    }
}

export default class MyAn extends Component{


  render() {
    return (
      <View style={styles.container}>
        <Input />
        <ShowText text="garyhu"/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MyAn',() => MyAn);
