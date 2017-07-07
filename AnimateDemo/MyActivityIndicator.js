import React, {
	Component
} from 'react';

import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator
} from 'react-native';


export default class MyActivityIndicator extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			animating : true,
		};
	}
	
	render() {
		return (
			<ActivityIndicator
			 animating={this.state.animating}
			 size='large'
			 color='red'></ActivityIndicator>
		);
	}
}
