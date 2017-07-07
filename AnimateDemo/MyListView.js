import React, {
	Component
} from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	ListView,
	TouchableHighlight,
	RecyclerViewBackedScrollView
} from 'react-native';

export default class MyListView extends Component {
	constructor(props){
		super(props);
		var ds1 = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
			sectionHeaderHasChanged: (s1,s2) => s1 !== s2
		});
		
		this.state = {
			dataSource1: ds1,
			dataSource2: ds1,
			data1: [
			   {
			   	text: '手势1',
			   	img : require('./images/ok.png')
			   },
			   {
			   	text: '手势2',
			   	img : require('./images/right.png')
			   },
			   {
			   	text: '手势3',
			   	img : require('./images/victor.png')
			   },
			   {
			   	text: '手势4',
			   	img : require('./images/xia.png')
			   },
			   {
			   	text: '手势5',
			   	img : require('./images/zan.png')
			   },
			   {
			   	text: '手势6',
			   	img : require('./images/zhang.png')
			   }
			],
			data2: {a:['ds','at'],b:['q','2fd'],c:['lf','8ui'],d:['l0p','ghj'],e:['la','ah']}
		}
	}
	
	_renderItem1(rowData,rowId) {
		return (
			<View style={{flex:1,flexDirection:'row',justifyContent: 'center',alignItems: 'center',backgroundColor:'#F7BA2A',marginTop: 10}}>
			   <Image source={rowData.img} style={{width:80,height:80}}/>
			   <Text style={{color: '#fff'}}>{rowData.text+"  "+rowId}</Text>
			</View>
		);
	}
	
	_renderItem2(rowData,sectionId,rowId) {
		return (
			<Text style={{color: '#fff'}}>{rowData+ '' + rowId+ "  "+sectionId}</Text>
		);
	}
	
	render() {
		return (
			<ScrollView>
			   <View style={styles.container}>
			      <ListView
			        style={{marginTop: 20}}
			        dataSource={this.state.dataSource1.cloneWithRows(this.state.data1)}
			        renderRow={((rowData,sectionId,rowId) => this._renderItem1(rowData,rowId))}
			        showsVerticalScrollIndicator={false}/>
			      <ListView 
			        style={{marginTop: 20}}
			        dataSource={this.state.dataSource2.cloneWithRowsAndSections(this.state.data2)}
			        renderRow={((rowData,sectionId,rowId) => this._renderItem2(rowData,sectionId,rowId))}
			        showsVerticalScrollIndicator={false}/>  
			   </View>
			</ScrollView>
		);
	}
}


const styles = StyleSheet.create({
  container: {
  	backgroundColor: 'skyblue',
  	justifyContent: 'center',
  	alignItems: 'center',
  	flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

