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
	Image,
	TextInput,
	ScrollView,
	FlatList,
	SectionList
} from 'react-native';

export default class NewProject extends Component {
	render() {
		let pic = {
			//          uri : "https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png"
		};

		let icon = require('./images/mine.png');
		let img = require('./images/banner.png');
		return(
			//默认为false，即竖直排列
			<ScrollView horizontal={false}>
        	   <View style={styles.container}>
        	      <Image source = { icon } style = {{ width: 80, height: 80 } }/>  
                  <Text style = { styles.welcome } >
                       First React Native!
                  </Text>  
                  <MyComponent name="Garyhu"/>
                  <FlashText name="Study Hard for Future !"/> 
                  <MyTextInput />
        	   </View>
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
        	   <Image source = { img } style = { styles.imgStyle }/>  
            </ScrollView>
		);
	}
}

class MyComponent extends Component {
	render() {
		return(
			<View>
			   <Text style={ styles.myComponentText }>Start Learn Run Android Develop</Text>
			   <Text style={ styles.myComponentText }>Author By {this.props.name}</Text>
			</View>
		);
	}
}

class FlashText extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showText: true
		};

		//设置1.5s显示一次
		setInterval(() => {
			this.setState({
				showText: !this.state.showText
			});
		}, 1000);
	}

	render() {
		let display = this.state.showText ? this.props.name : " ";
		return(
			<Text style={ styles.myFlashText }>{ display }</Text>
		);
	}
}

class MyTextInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "ok"
		};
	}

	render() {
		return(
			<View>
			   <TextInput style={ styles.myInput } 
			        placeholder="try here"
			        underlineColorAndroid="transparent"
			        onChangeText={(text) => this.setState({text})}/>
			   <Text>
			       {this.state.text.split(" ").map((word) => word&&"🍕").join(" ")}
			   </Text>
			</View>
		);
	}
}

class MyFlatList extends Component {
	constructor(props) {
		super(props);
		this.state= {
			moves: [
			       	  {key: "Jone"},
			       	  {key: "Honey"},
			       	  {key: "Smith"},
			       	  {key: "Jody"},
			       	  {key: "Henny"},
			       	  {key: "Luccy"},
			       	  {key: "Merry"},
			       	  {key: "Jessic"},
			       	  {key: "Linner"},
			       ]
		};
		this.getMoviesFromApiAsync();
	}
	
	getMoviesFromApiAsync() {
       return fetch('https://facebook.github.io/react-native/movies.json')
          .then((response) => response.json())
          .then((responseJson) => {
               this.state.moves = responseJson.movies;
          })
          .catch((error) => {
               console.error(error);
        });
    }
		
	render() {
		return (
			<View style = {styles.container}>
			   <FlatList
			       data={this.state.moves}
			       renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}/>
			</View>
		);
	}
			       
}
	
class MySectionList extends Component {
	constructor(props) {
		super(props);
		this.state={
			moves: [
			       	   {title: 'A', data: ['Abbel','Asarlin']},
			       	   {title: 'D', data: ['Devin','Done']},
			       	   {title: 'E', data: ['Ella','Elsabier','Eden']},
			       	   {title: 'H', data: ['Harry','Horiall']},
                       {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
			]
		}
	}
	
	render() {
		return (
			<View style={ styles.container }>
			    <SectionList
			       style={{flex: 1}}
			       sections={this.state.moves}
			       renderItem={({item}) => <Text style={ styles.sectionItem }>{item}</Text>}
			       renderSectionHeader={({section}) => <Text style={ styles.sectionItemHeader }>{section.title}</Text>}/>
			</View>
		);
	}
		
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
		paddingTop: 10
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
	myComponentText: {
		color: '#DCDCDC',
		fontSize: 18,
		textAlign: 'center'
	},
	myFlashText: {
		color: 'darkgreen',
		fontSize: 15,
		marginTop: 10,
		textAlign: 'center'
	},
	myInput: {
		color: 'skyblue',
		width: 120,
		height: 40,
		fontSize: 10,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#CCCCCC',
		marginTop: 10,
		borderRadius: 5,
		padding: 15
	},
	imgStyle: {
		width: 200,
		height: 100,
		margin: 10 
	},
	item: {
		flex: 1,
		backgroundColor: 'darkgreen',
		fontSize: 18,
		marginTop: 10,
		height: 40,
		textAlign: 'center',
		color: '#FFF'
   },
   sectionItem : {
   	  padding: 10,
      fontSize: 14,
      height: 44,
   },
   sectionItemHeader: {
   	   paddingTop: 2,
       paddingLeft: 10,
       paddingRight: 10,
       paddingBottom: 2,
       fontSize: 18,
       fontWeight: 'bold',
       color: '#111111',
       backgroundColor: 'rgba(247,247,247,1.0)',
   }
});

AppRegistry.registerComponent('NewProject', () => MySectionList);