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
	ToastAndroid,
	TouchableOpacity,
	FlatList,
	PanResponder
} from 'react-native';

export default class MyFlatList extends Component {
	
	static navigationOptions = {
		title: '获取城市',
		header: {
			style: {
				backgroundColor: '#D95311'
			},
			titleStyle: {
				alignSelf: 'center',
				color: '#FFF'
			},
			left: null
		},
		cardStack: {
			gesturesEnabled: false
		}
	}
	
	constructor(props) {
		super(props);
		this.state = {
			text: '等待获取数据',
			cityData: [],
			refresh: false
		}
	}
	
	async _fetch(){
		try{
			let response = await fetch("http://test.miaodj.cn/index.php/App/ExceptLogin/get_city_stores",{
			    method: 'POST',
			    headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                },
			    body: JSON.stringify({
				   city_name: ''
			    })
		    });
		
		    let data = await response.json();
		    if(data){
		    	this.setState({
		    		text: data.msg,
		    		cityData: data.info,
		    		refresh: false
		    	});
		    }
//		    ToastAndroid.show(data.msg+"",ToastAndroid.SHORT);
		}catch(err){
			ToastAndroid.show(err+"",ToastAndroid.SHORT);
		}
	}
	
	_onPress() {
		this.setState({
			refresh: true
		});
		this._fetch();
	}
	
	//列表的内容布局
	_renderItem({item}){
		return (
			<View style={{backgroundColor: '#ff0099cc',justifyContent: 'center',alignItems: 'center',height: 40}}>
		       <Text style={{color: '#fff'}}>{item.city_name}</Text>
		    </View>
		);
	}
	
	//数据为空时显示的界面
	_emptyView(){
		return (
			<View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
			    <Text>暂无数据</Text>
			</View>
		);
	}
	
	//列表的分割线
	_separatorLineView() {
		return (
			<View
			   style={{backgroundColor: '#000',height: 1}}></View>
		);
	}
	
	//列表头部布局
	_renderHeader(){
		return (
			<View style={{backgroundColor: '#FD6071',justifyContent: 'center',alignItems: 'center',height: 50}}>
			    <Text>城市开通的门店</Text>
			</View>
		);
	}
	
	//列表尾部布局
	_renderFooter(){
		return(
			<View style={{backgroundColor: '#D39B27',justifyContent: 'center',alignItems: 'center',height: 50}}>
			   <Text>我是列表的尾部啦</Text>
			</View>
		);
	}
	
	//刷新的布局
	_onRefresh(){
		
	}
	
	render() {
		const { goBack } = this.props.navigation;
		return (
			<View>
			   <View>
			      <View style={{backgroundColor: 'darkgreen',justifyContent: 'center',alignItems: 'center',height: 35}}>
			         <Text style={{color: '#fff'}}>
			              {this.state.text}
			         </Text>
			      </View>
				  <TouchableOpacity
					  onPress={this._onPress.bind(this)}>
					    <View style={{backgroundColor: 'skyblue',justifyContent: 'center',height: 40,alignItems: 'center'}}>
					       <Text>拉取数据</Text>
					    </View>
				  </TouchableOpacity>
			   </View>
			   <View>
			      <FlatList
			          data={this.state.cityData}
			          renderItem={({item}) => this._renderItem({item})}
			          ItemSeparatorComponent = {this._separatorLineView}
			          ListHeaderComponent = {this._renderHeader}
			          ListFooterComponent = {this._renderFooter}
			          onRefresh = {this._onRefresh}
			          refreshing={this.state.refresh}
			          ListEmptyComponent={this._emptyView}/>
			   </View>
			</View>
		);
	}
}
