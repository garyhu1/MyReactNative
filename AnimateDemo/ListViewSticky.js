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
	TouchableOpacity,
	RecyclerViewBackedScrollView
} from 'react-native';

import CartData from "./Car.json";

export default class ListViewSticky extends Component {
	constructor(props) {  
    super(props);  
    let getSectionData = (dataBlob, sectionID) => {  
      return dataBlob[sectionID];  
    };  
    let getRowData = (dataBlob, sectionID, rowID) => {  
      return dataBlob[sectionID + ':' + rowID];  
    };  
    //1.设置返回数据  
    this.state = {  
      dataSource: new ListView.DataSource({  
        getSectionData: getSectionData, // 获取组中数据  
        getRowData: getRowData, // 获取行中的数据  
        rowHasChanged: (r1, r2) => r1 !== r2,  
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2  
      })  
    }; 
  }  
   
   
  //复杂的操作:数据请求 或者 异步操作(定时器)  
  componentDidMount() {  
    //调用json数据  
    this._loadDataFromJson();  
  }  
  
  
  render() {  
    return (  
      <View style={styles.outerViewStyle}>  
        <View style={styles.headerViewStyle}>  
          <Text style={{ color: 'white', fontSize: 25 }}>SeeMyGo品牌</Text>  
        </View>  
        <ListView  
          dataSource={this.state.dataSource}  
          renderRow={this._renderRow}  
          showVerticalScrollIndicator={false}
          renderSectionHeader={this._renderSectionHeader}  
        />  
      </View>  
    );  
  }   
  
  //每一行的数据  
  _renderRow(rowData) {  
    return (  
      <TouchableOpacity activeOpacity={0.5}>  
        <View style={styles.rowStyle}>  
          <Image source={{ uri: rowData.icon }} style={styles.rowImageStyle} />  
          <Text style={{ marginLeft: 5 }}>{rowData.name}</Text>  
        </View>  
      </TouchableOpacity>  
    );  
  }  
  
  
  //返回每一组的数据  
  _renderSectionHeader(sectionData, sectionID) {  
    return (  
      <View style={styles.sectionHeaderViewStyle}>  
        <Text style={{ marginLeft: 5, color: 'red' }}>{sectionData}</Text>  
      </View>  
    );  
  }  
   
    
  _loadDataFromJson() {  
    // 拿到json数据  
    let jsonData = CartData.data;  
    // 定义一些变量  
    let dataBlob = {},  
      sectionIDs = [],  
      rowIDs = [],  
      cars = [];  
    for (let i in jsonData) {  
      // 1. 把组号放入sectionIDs数组中  
      sectionIDs.push(i);  
      // 2.把组中内容放入dataBlob对象中  
      dataBlob[i] = jsonData[i].title;  
      // 3. 取出该组中所有的车  
      cars = jsonData[i].cars;  
      rowIDs[i] = [];  
      // 4. 遍历所有的车数组  
      for (let j in cars) {  
        // 把行号放入rowIDs  
        rowIDs[i].push(j);  
        // 把每一行中的内容放入dataBlob对象中  
        dataBlob[i + ':' + j] = cars[j];  
      }  
    }  
    this.setState({  
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)  
    }); 
  }
		
}

// 设置样式  
const  styles = StyleSheet.create({  
    outerViewStyle:{  
      //占满窗口  
      flex:1  
    },  
  
    headerViewStyle:{  
        height:64,  
        backgroundColor:'orange',  
        justifyContent:'center',  
        alignItems:'center'  
    },  
  
    rowStyle:{  
        // 设置主轴的方向  
        flexDirection:'row',  
        // 侧轴方向居中  
        alignItems:'center',  
        padding:10,  
  
        borderBottomColor:'#e8e8e8',  
        borderBottomWidth:0.5  
    },  
  
    rowImageStyle:{  
        width:70,  
        height:70,  
    },  
  
    sectionHeaderViewStyle:{  
        backgroundColor:'#e8e8e8',  
        height:25,  
        justifyContent:'center'  
    }  
});  