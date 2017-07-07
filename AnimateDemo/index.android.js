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
	Animated,
	Image,
	Button,
	Easing,
	PanResponder
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import App from './app';
import GestureAnim from './GeneratorAnim';
import MyLayoutAnimate from './MyLayoutAnimate';
import MyToast from './MyToast';
import MyActivityIndicator from './MyActivityIndicator';
import MyButton from './MyButton';
import MyDrawerLayoutAndroid from './MyDrawerLayoutAndroid';
import MyImage from './MyImage';
import MyKeyboardAvoidingView from './MyKeyboardAvoidingView';
import MyListView from './MyListView';
import ListViewDemo from './ListViewDemo';
import ListViewSticky from './ListViewSticky';
import MyModal from './MyModal';
import ChatScreen from './MyNavigation';
import MyFlatList from './MyFlatList';

export default class AnimateDemo extends Component {
	render() {
		return(
			<View style={styles.container}>
        <FadeOut>
           <Image source = {{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
                style = {{width: 400,height: 400}}/>
        </FadeOut>
        <FadeIn>
            <Text style={{color: '#fff',fontSize: 18}}>悄悄的,我来了</Text>
        </FadeIn>
      </View>
		);
	}
}

/*图片慢慢消失，通过控制透明度*/
class FadeOut extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeOutOpacity: new Animated.Value(0),
		};
	}

	render() {
		return(
			<Animated.View
			    style = {{opacity: this.state.fadeOutOpacity,}}>
			   {this.props.children}
			</Animated.View>
		);
	}

	startAnim() {
		this.state.fadeOutOpacity.setValue(1)
		Animated.timing(
			this.state.fadeOutOpacity, {
				toValue: 0,
				duration: 2000,
				easing: Easing.linear
			}
		).start();
	}

	componentDidMount() {
		this.startAnim();
	}
}

/*慢慢的出现*/
class FadeIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeInOpacity: new Animated.Value(0),
		};
	}

	_startAnimation() {
		Animated.timing(
			this.state.fadeInOpacity, {
				toValue: 1,
				duration: 2000,
				easing: Easing.linear
			}
		).start();
	}

	//生命周期函数 render完成后调用
	componentDidMount() {
		this._startAnimation();
	}

	render() {
		return(
			<Animated.View style={{backgroundColor: '#0D8BAD',
			     opacity: this.state.fadeInOpacity}}>
			    {this.props.children}
			</Animated.View>
		);
	}

}

/*混合动画*/
class MixAnimate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fadeInOpacity: new Animated.Value(0),
			rotation: new Animated.Value(0),
			fontSize: new Animated.Value(0)
		}
	}

	componentDidMount() {
		let timing = Animated.timing;
		Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(poperty => {
			return timing(
				this.state[poperty], {
					toValue: 1,
					duration: 2000,
					easing: Easing.linear
				}
			);
		})).start();
	}

	render() {
		return(
			<Animated.View style={[styles.animate,{
				opacity: this.state.fadeInOpacity,
				transform: [{
                    rotateZ: this.state.rotation.interpolate({
                        inputRange: [0,1],
                        outputRange: ['0deg', '360deg']
                    })
                }]
			}]}>
			   <Animated.Text style={{
			   	  fontSize: this.state.fontSize.interpolate({
                      inputRange: [0,1],
                      outputRange: [12,26]
                  })
			   }}>
			        我骑着七彩祥云出现了😈💨
			   </Animated.Text>
			</Animated.View>
		);
	}
}

/*组合动画*/
class CombinationAnim extends Component {
	constructor(props) {
		super(props);
		this.state = {
			anim: [1, 2, 3].map(() => new Animated.Value(0)) // 初始化3个值
		}
	}

	componentDidMount() {
		var timing = Animated.timing;
		Animated.sequence([
			Animated.stagger(200, this.state.anim.map(left => {
				return timing(left, {
					toValue: 1
				});
			}).concat(this.state.anim.map(left => {
				return timing(left, {
					toValue: 0
				});
			}))), // 三个view滚到右边再还原，每个动作间隔200ms
			Animated.delay(400), // 延迟400ms，配合sequence使用
			timing(this.state.anim[0], {
				toValue: 1
			}),
			timing(this.state.anim[1], {
				toValue: -1
			}),
			timing(this.state.anim[2], {
				toValue: 0.5
			}),
			Animated.delay(400),
			Animated.parallel(this.state.anim.map((anim) => {
				return timing(anim, {
					toValue: 0
				});
			}))
		]).start();
	}

	render() {
		var views = this.state.anim.map(function(value, i) {
			return(
				<Animated.View
                 key={i}
                 style={[styles.animate, styles['demo' + i], {
                    left: value.interpolate({
                        inputRange: [0,1],
                        outputRange: [0,200]
                    })
                 }]}>
                <Text style={styles.text}>我是第{i + 1}个View</Text>
 
              </Animated.View>
			);
		});
		return <View style={styles.container}>
               <Text>sequence/delay/stagger/parallel演示</Text>
               {views}
             </View>;
	}
}

/*拖拽的动画*/
class DraggerAnim extends Component {
	constructor(props) {
     super(props);
     this.state = {
       pan: new Animated.ValueXY(), // inits to zero
     };
     this.state.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: Animated.event([null, {
         dx: this.state.pan.x, // x,y are Animated.Value
         dy: this.state.pan.y,
       }]),
       onPanResponderRelease: () => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {
           	toValue: {x: 0, y: 0}
           } // Back to zero
         ).start();
       },
     });
   }
   render() {
     return (
       <Animated.View
         {...this.state.panResponder.panHandlers}
         style={this.state.pan.getLayout()}>
         <Text style={{backgroundColor: 'red',width:40,height:30,color: '#fff'}}>移动</Text>
       </Animated.View>
     );
   }
}

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat',{user: 'garyhu'})}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Chat: { screen: ChatScreen },
  MyModal: {screen: MyModal },
  MyFlatList: {screen: MyFlatList }
}, {
    initialRouteName: 'Home', // 默认显示界面
    navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
        header: {  // 导航栏相关设置项
            backTitle: '返回',  // 左上角返回键文字
            style: {
                backgroundColor: '#fff'
            },
            titleStyle: {
                color: 'green'
            }
        },
        cardStack: {
            gesturesEnabled: true
        }
    }, 
    mode: 'modal',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
    headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
    onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
    onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
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
	animate: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	demo0: {
		backgroundColor: 'red'
	},
	demo2: {
		backgroundColor: 'darkgreen'
	},
	demo1: {
		backgroundColor: 'skyblue'
	},
	text: {
		fontSize: 15
	}
});

AppRegistry.registerComponent('AnimateDemo', () => SimpleApp);