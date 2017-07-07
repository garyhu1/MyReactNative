import React, 
{ 
	Component 
} from 'react';

import {
	StyleSheet,
	View,
	Text,
	LayoutAnimation,
	TouchableOpacity,
	Platform,
} from 'react-native';

//Android要添加该设置后才会看到动画
//UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const UIManager = require('UIManager');


export default class MyLayoutAnimate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			w: 100,
			h: 100
		}
	}
	
	componentWillMount() {
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		LayoutAnimation.spring();
	}
	
	_onPress() {
		//LayoutAnimation还有好多动画类型,如下所示：
		//spring, linear, easeInEaseOut, easeIn, easeOut, keyboard,
		LayoutAnimation.spring();
		this.setState({
			w: this.state.w+15,
			h: this.state.h+15
		});
	}
	
	render() {
		return (
			<View style={styles.container}>
			   <View style={[styles.rec,{width: this.state.w,height: this.state.h}]}/>
			   <TouchableOpacity onPress={this._onPress.bind(this)}
			         style={styles.btn}>
			      <Text style={styles.btnText}>点我</Text>
			   </TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		...Platform.select({
			ios: {
				backgroundColor: 'red'
			},
			android: {
				backgroundColor: 'green'
			}
		}),
		justifyContent: 'center',
		alignItems: 'center'
	},
	rec: {
		backgroundColor: 'red'
	},
	btn: {
		width: 80,
		height: 40,
		backgroundColor: 'skyblue',
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		borderRadius: 5
	},
	btnText: {
		color: '#fff',
	}
});
