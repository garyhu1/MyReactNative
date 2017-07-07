import React,{
	Component
} from 'react';

import {
	StyleSheet,
	View,
	Animated,
	Image,
	Text,
	Easing,
	PanResponder
} from 'react-native';

import Util from './Utils';

var _prevLeft = 0;
var _prevTop = 0;

var _lastLeft = 0;
var _lastTop = 0;

const CIRCLE_SIZE = 80;

export default class GeneratorAnim extends Component {
	constructor(props) {
		super(props);
		this.state = {
			style: {
				backgroundColor: 'skyblue'
			}
		};
		
		this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
		this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
		this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
		this.onPanResponderMove = this.onPanResponderMove.bind(this);
		this.onPanResponderEnd = this.onPanResponderEnd.bind(this);
	}
	
	//用户开始触摸屏幕的时候，是否愿意成为响应者
	onStartShouldSetPanResponder() {
		return true;
	}
	
	//在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互
	onMoveShouldSetPanResponder() {
		return true;
	}
	
	//在开始手势操作的时候，给用户一些反馈，让用户知道发生了什么
	onPanResponderGrant() {
		this.setState({
			style: {
				backgroundColor: 'skyblue',
				left: _prevLeft,
				top: _prevTop
			}
		});
	}
	
	//最近一次移动距离为gestureState.move({X,Y})
	onPanResponderMove(evt,gestureState) {
		_prevLeft = _lastLeft+gestureState.dx;
		_prevTop = _lastTop+gestureState.dy;
		
		if(_prevLeft < 0){
			_prevLeft = 0;
		}
		if(_prevTop < 0){
			_prevTop = 0;
		}
		if(_prevLeft > Util.size.width-CIRCLE_SIZE){
			_prevLeft = Util.size.width-CIRCLE_SIZE;
		}
		if(_prevTop > Util.size.height-CIRCLE_SIZE) {
			_prevTop = Util.size.height-CIRCLE_SIZE;
		}
		
		//进行实时更新
		this.setState({
			style: {
				backgroundColor: 'skyblue',
				left: _prevLeft,
				top: _prevTop
			}
		});
	}
	
	//用户放开了所有触摸点，此时视图成为了响应者
	//一般意味着一个手势操作已经完成了
	onPanResponderEnd(evt,gestureState) {
		_lastLeft = _prevLeft;
		_lastTop = _prevTop;
		
		
	}
	
	componentWillMount(evt,gestureState) {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder : this.onStartShouldSetPanResponder,
			onMoveShouldSetPanResponder : this.onMoveShouldSetPanResponder,
			onPanResponderGrant : this.onPanResponderGrant,
			onPanResponderMove : this.onPanResponderMove,
			onPanResponderRelease : this.onPanResponderEnd,
			onPanResponderTerminate : this.onPanResponderEnd,
		});
	}
	
	render() {
		return (
			<View 
		        {...this._panResponder.panHandlers} 
		        style={[styles.circle,this.state.style]}/>
		);
	}
}

const styles = StyleSheet.create({
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE/2,
		position: "absolute",
	}
});
