import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	PropTypes,
	Navigator,
	ScrollView,
	NativeModules,
	TextInput,
	ListView,
	Image,
	ToastAndroid,
	RefreshControl,
} from 'react-native';
import React, {
	Component
} from 'react';

import Dimensions from 'Dimensions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ListViewDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			ds: new ListView.DataSource({
				getRowData: getRowData,
				getSectionData: getSectionData,
				rowHasChanged: (r1, r2) => r1 !== r2,
				sectionHeaderHasChanged: (s1, s2) => s1 !== s2
			})
		}

	}

	componentDidMount() {
		this._fetch();
	}

	async _fetch() {
		let response = await fetch('https://wangclub.herokuapp.com/getListViewData')
		let json = await response.json()
		if(json) {
			this.setState({
				text: '获取到了数据',
				data: json
			})
		}
	}

	_renderRow(rowData, sectionId, rowId) {
		ToastAndroid.show(sectionId,ToastAndroid.SHORT);
		if(sectionId === 'article'){
			return(
				<View style={{flexDirection:'row',marginTop:15,marginBottom:15,backgroundColor:'white'}}>
				    <View>
				       <Image source={{uri: rowData.pic}} style={{marginLeft:15,width:100,height:75,alignSelf:'center'}}/>
				    </View>
				    <View style={{marginLeft:10,width:width/2 + 25}}>
                        <Text style={{marginTop:5,fontSize:15,color:'#333333'}}>{rowData.title}</Text>
                        <View style={{position:'absolute',top:60,flexDirection:'row'}}>
                            <Text style={{fontSize:10,color:'#999999'}}>{rowData.publish_at_friendly}</Text>
                        </View>
                        <Image source={require('./styles/assets/ribaopinlun.png')} style={{position:'absolute',top:62,width:12,height:12,right:15}}/>
                        <Text style={{position:'absolute',top:60,fontSize:10,color:'#999999',right:2}}>{rowData.comment_count}</Text>
                    </View>
				</View>
			);
		}else if(sectionId === 'brandme'){
			return (
				<View style={{flex:1,flexDirection: 'row'}}>
				   <View>
				      <Image source={{uri: rowData.avatar_file_big}} 
				          styly={{marginLeft: 10,width: 100,height:75}}
				          resizeMethod='resize'/>
				   </View>
				   <View>
				       <Text>{rowData.realname}</Text>
				       <Text>{rowData.remark}</Text>
				   </View>
				</View>
			);
		}else if(sectionId === 'question') {
			return (
				<View>
				    <Text>{rowData.question_content}</Text>
				    <Text>{rowData.reward}</Text>
				</View>
			);
		}else if(sectionId === 'service'){
			return (
				<View>
				   <Text>{rowData.name} :</Text>
				   <Text>{rowData.keyword}</Text>
				   <Image source={{uri: rowData.service_image}} style={{width: 100,height:75}} resizeMethod='scale'/>
				   <Image source={{uri: rowData.cover}} style={{width: 100,height:75}}/>
				   <Image source={{uri: rowData.cover_big}} style={{width: 100,height:75}}/>
				   <Image source={{uri: rowData.flow_img}} style={{width: 100,height:75}}/>
				   <Image source={{uri: rowData.icon}} style={{width: 100,height:75}}/>
				   <Image source={{uri: rowData.product_image}} style={{width: 100,height:75}}/>
				</View>
			);
		}
	}
	
	_renderHeader(sectionData,sectionId){
		return(
			<View style={{flex: 1 ,backgroundColor: 'red',height: 40,justifyContent: 'center',alignItems: 'center'}}>
			   <Text style={{color: '#fff'}}>{sectionId}</Text>
			</View>
		);
	}


	_renderList() {
		if(this.state.data) {
			return(
				<ListView 
			      dataSource={this.state.ds.cloneWithRowsAndSections(this.state.data.lists)}
			      renderRow={(rowData,sectionID,rowId) => this._renderRow(rowData,sectionID,rowId)}
			      renderSectionHeader={(sectionData,sectionId) => this._renderHeader(sectionData,sectionId)}
			      showsVerticalScrollIndicator={false}/>
			);
		} else {
			return false;
		}
	}

	render() {
		return(
			<View style={{flex:1,backgroundColor: 'white'}}>
			   {this._renderList()}
			</View>
		);
	}
}