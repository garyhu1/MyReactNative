import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	Modal,
	TextInput,
	TouchableHighlight
} from 'react-native';


export default class MyKeyboardAvoidingView extends Component {

	static title = '<KeyboardAvoidingView>';
	static description = 'Base component for views that automatically adjust their height or position to move out of the way of the keyboard.';

	constructor(props) {
		super(props);
		this.state = {
			behavior: 'padding',
			modalOpen: false
		}
	}

	render() {
		return(
			<View style={styles.outerContainer}>
              <Modal animationType="fade" visible={this.state.modalOpen}>
                 <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
                    <TextInput
                      placeholder="<TextInput />"
                      style={styles.textInput} />
                 </KeyboardAvoidingView>
                 <TouchableHighlight
                   onPress={() => this.setState({modalOpen: false})}
                   style={styles.closeButton}>
                   <Text>Close</Text>
                 </TouchableHighlight>
              </Modal>

              <TouchableHighlight onPress={() => this.setState({modalOpen: true})}>
                 <Text>Open Example</Text>
              </TouchableHighlight>
            </View>
		);
	}
	
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  segment: {
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  }
});
