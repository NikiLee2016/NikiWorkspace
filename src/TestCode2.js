/**
 * Created by Niki on 2019-10-09 20:31.
 * Email: m13296644326@163.com
 */

import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import StyleSheet from 'lyg-utils/StyleSheet';
import { Toast } from 'teaset';
import { noop, getByteLength } from '~/utils/common';


export default class ContentArea extends Component {
    static defaultProps = {
        maxLength: 1000,
        content: '',
        modify: noop,
    };

    constructor(props) {
        super(props);

        const { content } = props;

        this.backKeyFlag = false;

        this.topicId = '';

        this.state = {
            content: '',
        };
    }

    replaceTopics = async () => {
        const { content } = this.state;
        let newContent = '';

        const arr = Array.from(content);

        if (this.topicId && content) {
            const startIndex = content.indexOf('#');
            const endIndex = content.lastIndexOf('#');
            newContent = arr.splice(startIndex, endIndex).join('');
            await this.state({
                content: newContent,
            });
        }
    }

    insertTopics = async (topic) => {
        if (this.textInput) {
            this.textInput.focus();
        }

        await this.replaceTopics();

        const { content } = this.state;
        const selection = this.textInput._lastNativeSelection || null;

        const { name, id } = topic;

        const topicName = `#${name}#`;

        this.topicId = id;

        if (!content) {
            this.setState({
                content: topicName,
            }, () => {
                const position = this.state.content.length - 1;
                this.textInput.focus();
            });
            return;
        }
        if (selection != null && selection.start === selection.end) {
            const startStr = content.substr(0, selection.start);
            const endStr = content.substr(selection.start);
            this.setState({
                content: `${startStr}${topicName}${endStr}`,
            }, () => {
                this.textInput.focus();
            });
        } else {
            this.setState({
                    content: `${content}${topicName}`,
                },
                () => {
                    const position = this.state.content.length - 1;
                    this.textInput.focus();
                    setTimeout(() => {
                        this.textInput.setNativeProps({
                            selection: { start: position, end: position },
                        });
                    }, 10);
                });
        }
    }

    handleChangeText = (content) => {
        console.log('handleChangeText');
        // const { modify, maxLength } = this.props;

        // if (getByteLength(content) > maxLength * 2) {
        //   Toast.message(`最多输入${maxLength}个字`, 1000, 'center');
        //   return;
        // }

        // this.setState({ content });
        // modify(content);
        if (this.backKeyFlag) {
            return;
        }

        this.setState({
            content,
        });
    }

    handleKeyPress = (event) => {
        console.log('handleKeyPress');
        console.log(event.nativeEvent.key);

        const { key } = event.nativeEvent;

        console.log(event.nativeEvent);

        const { content } = this.state;

        this.backKeyFlag = false;


        console.log(this.textInput._lastNativeSelection);

        if (key.toLowerCase() === 'backspace') {
            this.backKeyFlag = true;

            if (!content) {
                return;
            }
            const arr = Array.from(content);

            let newValue = content;

            const selection = this.textInput._lastNativeSelection || null;

            let index = 0;

            if (selection) {
                if (selection.start === selection.end) {
                    index = selection.start - 1;
                } else {
                    index = arr.length - 1;
                }
            }

            if (arr[index] !== '#') {
                arr.pop();
                newValue = arr.join('');
            } else {
                let tagIndex = arr.lastIndexOf('#');
                if (tagIndex == index) {
                    tagIndex = arr.indexOf('#');
                }
                const startTagIndex = arr.indexOf('#');
                const endTagIndex = arr.lastIndexOf('#');

                if (startTagIndex == endTagIndex) {
                    arr.pop();
                    newValue = arr.join('');
                } else {
                    newValue = arr.splice(0, tagIndex).join('');
                    this.topicId = '';
                }


                // if (tagIndex != index && tagIndex > -1) {
                //   newValue = arr.splice(0, tagIndex).join('');
                //   this.topicId = '';
                // } else {
                //   console.log(2234324);
                //   arr.pop();
                //   newValue = arr.join('');
                // }
            }

            this.setState({
                content: newValue,
            });
        }
    }

    handleChange = (event) => {
        console.log('handleChange');
    }

    render() {
        const { content } = this.state;
        return (
            <View style={styles.contentWrapper}>
                <TextInput
                    style={[
                        styles.textInput,
                        styles.content,
                    ]}
                    ref={ref => this.textInput = ref}
                    value={content}
                    paddingVertical={0}
                    underlineColorAndroid="transparent"
                    multiline
                    placeholder="说说想说的..."
                    placeholderTextColor={styles.placeholder.color}
                    // onChangeText={this.handleChangeText}
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    onChangeText={this.handleChangeText}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        paddingTop: 0,
        fontSize: 16,
    },
    contentWrapper: {
        paddingVertical: 16,
    },
    content: {
        maxHeight: 80,
    },
    placeholder: {
        color: '#989898',
    },
});

