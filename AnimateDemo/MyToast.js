import React,{
	Component
} from 'react';

import {
	Text,
	View,
	StyleSheet,
	ToastAndroid,
	TouchableHighlight,
	TouchableNativeFeedback
} from 'react-native';

export default class MyToast extends Component {
	constructor(props) {
		super(props);
	}
	
	_showCenter() {
		ToastAndroid.showWithGravity("Hello React Native !",ToastAndroid.SHORT,ToastAndroid.CENTER);
	}
	
	_showBottom() {
		ToastAndroid.show("Hello React Native !",ToastAndroid.SHORT);
	}
	
	render() {
		return (
			<View>
			    <TouchableHighlight onPress={this._showCenter.bind(this)}>
			       <View style={styles.showCenter}><Text style={styles.showText}>中间显示</Text></View>
			    </TouchableHighlight>
			    <TouchableNativeFeedback onPress = {this._showBottom.bind(this)}>
			       <View style={styles.showBottom}>
			           <Text style={styles.showText}>底部显示</Text>
			       </View>
			    </TouchableNativeFeedback>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	showCenter : {
		backgroundColor: '#20A0FF',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	showText: {
		color: '#fff'
	},
	showBottom: {
		marginTop: 10,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "#13CE66"
	}
});
