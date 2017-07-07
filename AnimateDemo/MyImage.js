import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid
} from 'react-native';

//在加载前进行获取图片尺寸的操作
const size = Image.getSize('http://facebook.github.io/react/img/logo_og.png',(w,h) => {
//	ToastAndroid.show('宽：'+w+"高："+h,ToastAndroid.SHORT);
}, (err) => {
//	ToastAndroid.show(err,ToastAndroid.SHORT);
});

export default class MyImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}
	
	_onLoadEnd(){
		ToastAndroid.showWithGravity('加载完成',ToastAndroid.SHORT,ToastAndroid.CENTER);
	}
	
	_onLoadStart() {
		this.setState({
			show: !this.state.show
		});
	}
	
	render() {
		
		let display = this.state.show?"开始加载图片": "";
		
		return (
			<View>
			   <Image source={require('./images/banner.png')}
			      style={styles.img}
			      resizeMethod='resize'
			      onLoadStart={this._onLoadStart.bind(this)}
			      onLoadEnd={this._onLoadEnd.bind(this)}/>
			   <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} 
			      resizeMode= 'center'
			      style={{width: 180,height: 180}}/>
			   <Text>{display}</Text>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	img: {
		width: 100,
		height: 100
	}
});
