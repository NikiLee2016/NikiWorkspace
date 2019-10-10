/**
 * Created by Niki on 2019-10-10 17:58.
 * Email: m13296644326@163.com
 */

import React from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    Platform, TextInput, TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isIos = Platform.OS === 'ios';

const LYTextInput = require('./LYTextInput');

export default class TestNativeTextInputPage extends React.PureComponent {

    static propTypes = {
        item: PropTypes.object,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff',}}>
                <LYTextInput
                    ref={ref => this.textInput = ref}
                    onChange={this._onTextChange}
                    style={{
                        height: 200, backgroundColor: '#b2b2b2'
                    }}
                    multiline={true}
                    underlineColorAndroid={'#0000'}/>
                <View style={{flexDirection: 'row', marginTop: 20,}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.textInput.setNativeProps({
                                emoji: 'lll'
                            })
                        }}
                        style={{
                            width: 40, height: 30, backgroundColor: '#0f0', marginRight: 20,
                        }}/>
                    <TouchableOpacity
                        onPress={() => {
                            this.textInput.setNativeProps({
                                topic: '#莫雷胖子闪现开团#'
                            })
                        }}
                        style={{
                            width: 40, height: 30, backgroundColor: '#00f',
                        }}/>
                </View>
            </View>
        )
    }

}
