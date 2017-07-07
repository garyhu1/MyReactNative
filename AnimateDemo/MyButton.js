import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	Button,
	ToastAndroid
} from 'react-native';

export default class MyButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			text: '点我'
		}
	}
	
	_onPress() {
		this.setState({
			text : '我被点击了'
		});
		ToastAndroid.show('这是我 第一次使用Button',ToastAndroid.SHORT);
	}
	
	render() {
		return (
			<View>
			   <Button
			    onPress = {this._onPress.bind(this)}
			    title={this.state.text}></Button>
			</View>
		);
	}
}
