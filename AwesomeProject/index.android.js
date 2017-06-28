/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

class Blink extends Component {
   constructor(props){
       super(props);
       this.state = {showText:true};

       //每隔1s显示一下文字
       setInterval(() => {
          this.setState({ showText: !this.state.showText });
       },1000);
   }

   render() {
              // 根据当前showText的值决定是否显示text内容
              let display = this.state.showText ? this.props.text : ' ';
              return (
                <Text>{display}</Text>
              );
   }
}

export default class AwesomeProject extends Component {

   constructor(props) {
       super(props);
       this.state = {text: ''};
     }

   render() {
      let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
          };
      return (
          <View>
              <View style={{flexDirection:'row',height:50,backgroundColor: "red",alignItems: 'center'}}>
                               <Image source={require('./img/goback.png')} style={{width: 20, height: 20,marginLeft:15}} />
                               <Text style={{alignItems: 'center',color:"#fff"}}>会销</Text>
                        </View>
              
          </View>
      );
   }
}

const styles = StyleSheet.create({
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
