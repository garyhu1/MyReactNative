import React,{
	Component
} from "react";

import {
	Text,
	View,
	Navigator,
	StyleSheet
} from 'react-native';

import MyModal from './MyModal';

export default class SampleComponent extends Component {
        render() {
            let defaultName = 'MyModal';
            let defaultComponent = MyModal;
            return (
            <Navigator
              initialRoute={{ name: defaultName, component: defaultComponent }}
              configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }} />
            );
        }
}
