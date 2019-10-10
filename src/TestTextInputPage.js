/**
 * Created by Niki on 2019-10-09 16:29.
 * Email: m13296644326@163.com
 */

import React from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    Platform,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import PropTypes from "prop-types";
import * as _ from 'lodash';

const type_topic = 'topic';
const type_text = 'text';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const isIos = Platform.OS === 'ios';

export default class TestTextInputPage extends React.PureComponent {

    static propTypes = {
        item: PropTypes.object,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            content: [{type: type_text, value: ''}],
        };
        this.topicPosition = [-1, -1];
        this.topicText = '';
    }

    componentDidMount(): void {
    }

    render() {
        const {content} = this.state;
        return (
            <View style={{flex: 1, backgroundColor: '#ffffff',}}>
                <TextInput
                    // onChangeText={(text) => console.warn('', text)}
                    ref={ref => this.textInput = ref}
                    value={''}
                    onChange={this._onTextChange}
                    style={{
                        height: 200, backgroundColor: '#b2b2b2'
                    }}
                    multiline={true}
                    underlineColorAndroid={'#0000'}>
                    {this._parseContent(content)}
                </TextInput>

                <TouchableOpacity
                    onPress={() => {
                        this._appendTopic('#莫雷肉身闪现开团#')
                    }}
                    style={{
                        marginTop: 20,
                        width: 40, height: 30, backgroundColor: '#0f0',
                    }}/>
            </View>
        )
    }

    _parseContent = (array) => {
        let find = _.find(array, {type: type_topic});
        if (!!find) {
            return array.map((item, index) => {
                if (item.type === type_text) {
                    return item.value;
                }
                return (<Text
                    key={index + ''}
                    style={{color: '#0f0'}}>{item.value}</Text>)
            })
        }
        return array.reduce((pre, now) => {
            return pre + now.value;
        }, '')
    };

    _appendTopic = (value) => {
        let position = this._getIndexPosition();
        if (position === -1){
            return;
        }
        let {content} = this.state;
        // 过滤掉老话题, 且得出新的光标位置
        if (this.topicPosition[0] !== -1){
            if (position <= this.topicPosition[0]){
                // 移除老话题
                _.remove(content, {type: type_topic});
            }else if (position >= this.topicPosition[1] ){
                // 移除老话题, 并且修正光标索引误差
                position = position - this.topicText.length;
                _.remove(content, {type: type_topic});
            }else {
                // 如果正好落在区域内, 不允许修改
                return;
            }
        }
        const originContentStr = content.map(item => item.value).join('');
        const originContentLength = originContentStr.length;
        this.topicPosition = [position, position + value.length];
        this.topicText = value;
        content = [];
        if (position === 0){
            content.push({type: type_topic, value}, {type: type_text, value: originContentStr});
        }else if (position < originContentLength){
            content.push({type: type_text, value: originContentStr.substring(0, position)});
            content.push({type: type_topic, value});
            content.push({type: type_text, value: originContentStr.substring(position)});
        }else {
            content.push({type: type_text, value: originContentStr}, {type: type_topic, value});
        }
        this.setState({content: [...content]});
    };

    _onTextChange = (event) => {
        let position = this._getIndexPosition();
        const {nativeEvent: {eventCount, target, text}} = event;
        if (position === -1) {
            return;
        }
        const {content} = this.state;
        const originContentLength = content.map(item => item.value).join('').length;
        if (!text) {
            content[0].value = '';
            this.setState({content: [...content]});
            return;
        }
        if (this.topicPosition[0] < 0) {
            content[0].value = text;
            this.setState({content: [...content]});
            return;
        }
        if (position > this.topicPosition[0] && position < this.topicPosition[1]){
            // 如果是删除, 那么清空话题
            // 如果是增加, 那么不允许
            // 根据新字符的长度, 判断是删除还是增加
            if (text.length >= originContentLength){
                return;
            }
            this._deleteTopic();
            return;
        }
        // 如果已删除了话题的某个字, 那么全部删除
        if (text.indexOf(this.topicText) === -1) {
            this._deleteTopic();
            return;
        }
        // 长度固定为2, 且可能出现空串
        let contentSplit = text.split(this.topicText);
        // 如果落在话题左侧
        if (position <= this.topicPosition[0]) {
            let firstItem = content[0];
            if (firstItem.type === type_topic) {
                content.push({type: type_text, value: contentSplit[0]}, ...content);
            } else {
                firstItem.value = contentSplit[0];
            }
            content[0].value = contentSplit[0];
            // 话题坐标已变化
            this.topicPosition = [content[0].value.length, content[0].value.length + this.topicText.length]
        }
        // 如果落在话题右侧
        else if (position >= this.topicPosition[1]) {
            // 光标正处于话题尾端
            /*if (position === this.topicPosition[1]){

            }*/
            let lastItem = content[content.length - 1];
            if (lastItem.type === type_topic) {
                content.push({type: type_text, value: contentSplit[contentSplit.length - 1]})
            } else {
                lastItem.value = contentSplit[contentSplit.length - 1];
            }

        }
        // 如果落在话题中间
        else {
            return;
        }
        this.setState({content: [...content]});
    };

    _deleteTopic = () => {
        if (this.topicPosition[0] === -1){
            return;
        }
        this.topicPosition = [-1, -1];
        this.topicText = '';
        let {content} = this.state;
         _.remove(content, {type: type_topic});
        this.setState({content: [...content]});
    };

    _getIndexPosition = () => {
        const {content} = this.state;
        // 第一个元素为空, 那么判定整个数组为空! 提升性能
        if (!content || !content[0] || !content[0].value) {
            return 0;
        }
        const selection = this.textInput._lastNativeSelection || null;
        if (!selection || selection.start !== selection.end) {
            return -1;
        }
        return selection.start;
    }

}
