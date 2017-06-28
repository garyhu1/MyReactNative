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
  ProgressBarAndroid,
  TouchableHighlight
} from 'react-native';

export default class TestOne extends Component {
  _onpressBtn() {
  	  console.log("pressed  button");
  }
  render() {
    return(
    	<View style = {styles.container}>
    	    <View style={{height:60,flexDirection:"row",alignItems:'center',backgroundColor:'#f6f6f6'}}>
    	        <Image source={require('./img/goback.png')} style = {{width:20,height:20,marginLeft:20}}/>
    	        <View style={{flex:1,alignItems:'center',position:'relative',left:-40}}>
    	             <Text style={{color:'#333333',fontSize:23}}>会销</Text>
    	        </View>
    	    </View>
    	    <View style={{borderRadius:10,backgroundColor:"#ffffff",margin:12}}>
    	        <Text style={{color:'#333333',fontSize:20,margin:10}}>
    	             2016第三届上海国际科普产品...
    	        </Text>
    	        <View style={{backgroundColor:'#d7d7d7',height:1}}></View>
    	        <View style={{flexDirection:'row',height:80,alignItems:'center'}}>
    	            <Image source={require('./img/fish-2.png')} style={{width:40,height:40,marginLeft:15}}/>
    	            <View style={{marginLeft:15}}>
    	               <Text style={{color:'#333333'}}>于杰  36366</Text>
    	               <Text style={{color:'#333333'}}>18862344595</Text>
    	            </View>
    	            <Image source={require('./img/grade.png')} style={{width:40,height:40,position:'absolute',right:15}}/>
    	        </View>
    	        <View style={{flexDirection:'row',height:30,alignItems:'center'}}>
    	           <Image source={require('./img/time.png')} style={{width:20,height:20,marginLeft:15}}/>
    	           <Text style={{marginLeft:10,color:'#999999'}}>2016-06-06~2016-07-08</Text>
    	        </View>
    	        <View style={{flexDirection:'row',height:30,alignItems:'center'}}>
    	           <Image source={require('./img/position.png')} style={{width:20,height:25,marginLeft:15,}}/>
    	           <Text style={{marginLeft:10,color:'#999999'}}>江苏省苏州市吴中区裕新路188号同城大厦</Text>
    	        </View>
    	        <View style={{marginLeft:15,height:50,flexDirection:'row',alignItems:'center'}}>
    	            <ProgressBarAndroid color="#ff674b" styleAttr='Horizontal' height={30}
    	                  progress={0.3} indeterminate={false} style={{width:150,backgroundColor:"#c9c9c9"}}/>
    	            <Text style={{color:'#666666',marginLeft:10}}>预期目标100.00万</Text>
    	        </View>
    	    </View>
    	    <TouchableHighlight onPress={this._onpressBtn}>
    	       <Text>Button</Text>
    	    </TouchableHighlight>
    	</View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: 'column',
		backgroundColor: "#e9ecf1"
	},
});


AppRegistry.registerComponent('TestOne', () => TestOne);
