import React,{
	Component
} from 'react';
import {
  AppRegistry,
  View,
  Button,
  ToastAndroid,
  Text,
} from 'react-native';

export default class ChatScreen extends Component {
	
	constructor(props){
		super(props);
		const { goBack } = this.props.navigation;	
		this.state = {
			go: goBack
		}
	}
	
  static navigationOptions = {
  	  title: '',
  	  header: (navigation,defaultHeader) => ({
  	  	  tintColor: '#fff',//设置导航栏的字体颜色
  	  	  style: {//设置导航栏样式
  	  	  	backgroundColor: 'skyblue',
  	  	  	paddingLeft: 10,
  	  	  	paddingRight: 10,
  	  	  	height: 50
  	  	  },
  	  	  title: '我的导航栏',
  	  	  titleStyle: {
  	  	  	 color: 'red',
  	  	  	 alignSelf: 'center'
  	  	  },
  	  	  visible: true,//是否显示导航栏
  	  	  backTitle: '返回',
  	  	  right: (<Button title="取消" onPress={() => {ToastAndroid.show('取消',ToastAndroid.SHORT)}}
  	  	              style={{fontSize: 10,color: 'red'}}/>),
  	  	  left: ((<Button title="返回" onPress={() => {ToastAndroid.show('返回',ToastAndroid.SHORT)}}/>))
  	  }),
  	  cardStack:{
  	  	gesturesEnabled: true,//支持手势右滑退出界面
  	  },
  }
  _onPress() {
  	ToastAndroid.show('ToolBar',ToastAndroid.SHORT);
  }
  
  render() {
  	const { params } = this.props.navigation.state;
  	const { navigate,goBack } = this.props.navigation;	
    return (
      <View style={{flex: 1,backgroundColor: 'red'}}>
        <Text style={{color: '#fff'}}>Chat with {params.user}</Text>
        <Button
           title="GO Modal"
           onPress={() => navigate('MyModal')}/>
        <View  style={{marginTop: 10}}>
           <Button 
              title={'返回'}
              onPress={() => {goBack()}}/>
        </View>
        <View style={{marginTop: 10}}>
            <Button
               title={'去列表栏'}
               onPress={() => navigate('MyFlatList')}/>
        </View>
      </View>
    );
  }
}