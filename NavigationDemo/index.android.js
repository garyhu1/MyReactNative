/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	Component
} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	Animated,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

export default class NavigationDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showText: false
		};
	}

	_btnClick() {
			this.setState({show:!this.state.showText});
		//	console.log('onPress');
	}

	render() {
		let display = this.state.showText ? "garyhu" : "";
		return(
			<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <TouchableOpacity onPress={this._btnClick().bind(this)} style={styles.btn}>
           <Text style={styles.btnText}>Button</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={this._btnClick().bind(this)} style={styles.touchBtn}>
            <Text>Button</Text>
        </TouchableHighlight>
        <TouchableNativeFeedback
            onPress={this._onPressButton}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.touchBtn}>
               <Text>Button</Text>
            </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback onPress={this._btnClick().bind(this)} style={styles.touchBtn}>
            <View style={styles.touchBtn}>
                 <Text>Button</Text>
            </View>
        </TouchableWithoutFeedback>
        <Text>{display}</Text>
      </View>
		);
	}
}

/*动画组件*/
class FadeInView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeAnim: new Animated.Value(0), //透明度初始值设为0
		};
	}

	componentDidMount() {
		Animated.timing(
			this.state.fadeAnim, {
				toValue: 1,
				duration: 2000,
			}
		).start();
	}

	render() {
		return(
			<Animated.View style={{width:300,height:60,backgroundColor: "#0F6C83",opacity: this.state.fadeAnim}}>
			   {this.props.children}
			</Animated.View>
		);
	}
}

/*组合动画*/
class CombinationAnim extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Animated.View>
			   {this.props.children}
			</Animated.View>
		);
	}
}

class MyAnimate extends Component {
	render() {
		return(
			<View style={styles.container}>
			   <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
			       <Text style={{fontSize: 28, textAlign: 'center', margin: 10,color: '#fff'}}>Fading in</Text>
			   </FadeInView>
			   <CombinationAnim>
			        <Text style={{fontSize: 28, textAlign: 'center', margin: 10,color: '#fff'}}>Sequence Anim</Text>
			   </CombinationAnim>
			</View>
		);
	}
}

class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Welcome',
	};
	render() {
		return <Text>Hello, Navigation!</Text>;
	}
}

const SimpleApp = StackNavigator({
	Home: {
		screen: HomeScreen
	},
});

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
	btn: {
		width: 80,
		height: 40,
		backgroundColor: '#0F95B9',
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#03313B',
		borderRadius: 5,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: '#fff',
		fontSize: 12,
	},
	touchBtn: {
		width: 100,
		height: 40,
		marginTop: 10,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderColor: '#111111',
		borderRadius: 5,
	}
});

AppRegistry.registerComponent('NavigationDemo', () => MyAnimate);