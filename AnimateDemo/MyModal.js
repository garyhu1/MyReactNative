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
	Modal,
	Easing,
	ToastAndroid,
	Switch,
	Button,
	TouchableHighlight,
	TouchableOpacity,
	PanResponder
} from 'react-native';

export default class MyModal extends Component {
	static navigationOptions = {
        title: 'Modal',
    };
	constructor(props){
		super(props);
		this.state = {
			animationType: 'slide',
            modalVisible: false,
            transparent: true,
		}
	}
	
	_setModalVisible(visible) {
       this.setState({modalVisible: visible});
    }

    _setAnimationType(type) {
       this.setState({animationType: type});
    }

    _toggleTransparent() {
       this.setState({transparent: !this.state.transparent});
    }

    render() {
      var modalBackgroundStyle = {
         backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
      };
      var innerContainerTransparentStyle = this.state.transparent
         ? {backgroundColor: '#fff', padding: 20}
         : null;
      var activeButtonStyle = {
         backgroundColor: '#ddd'
      };

      return (
         <View>
           <Modal
             animationType={this.state.animationType}
             transparent={this.state.transparent}
             visible={this.state.modalVisible}
             onRequestClose={() => {this._setModalVisible(false)}}
             >
	          <View style={[styles.container, modalBackgroundStyle]}>
	            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
	              <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
	              <Button
	                onPress={this._setModalVisible.bind(this, false)}
	                style={styles.modalButton}
	                title='close'>
	              </Button>
	            </View>
	          </View>
           </Modal>
	        <View>
	          <TouchableOpacity 
	             onPress={this._setModalVisible.bind(this,true)}>
	             <View 
	                 style={{backgroundColor: 'skyblue',height:40,justifyContent: 'center',alignItems: 'center'}}>
	                 <Text>显示Modal</Text>
	             </View>
	          </TouchableOpacity>
	        </View>

	     
      	</View>
    );
  }

}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});