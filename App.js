/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    PermissionsAndroid,
    Image,
    Dimensions,
    TextInput,
    NativeModules, ScrollView, Keyboard
} from 'react-native';
import PropTypes from "prop-types";
import SyanImagePicker from 'react-native-syan-image-picker';

const {JumpModule} = NativeModules;

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            imagePath: {uri: null},
        }
    }

    render() {
        return (
            <View
                style={styles.container}>
                <BlueButton
                    onPress={() => {
                        SyanImagePicker.asyncShowImagePicker({
                            imageCount: 1,
                            isCrop: true,
                            enableBase64: true,
                        })
                            .then(photos => {
                                // 选择成功
                                // StringUtil.translateObj2String(photos);
                                // alert(typeof photos);
                                //const uri ='file://' +  photos[0].origin_file;
                                this.setState({imagePath: {uri: photos[0].base64}});
                            })
                            .catch(err => {
                                // 取消选择，err.message为"取消"
                            })
                    }}
                    text={'test syan picker'}
                />
                {/*<Image style={{width: screenWidth, height: 600, resizeMode: 'contain'}} source={this.state.imagePath}/>*/}
                {/*<TextInput
                    style={{marginTop: 20, height: 60, backgroundColor: '#0f0'}}
                    onChangeText={text => console.warn(text)}/>*/}
                <BlueButton onPress={() => {
                    JumpModule.jump();
                }
                }/>
                    <ScrollView
                        onScroll={(event) => console.warn(event.nativeEvent.contentOffset)}
                        style={{flex: 1, backgroundColor: '#f00'}}>
                        <View style={{height: 1000}}/>
                    </ScrollView>

            </View>
        );
    }

    componentDidMount() {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, '')
            .then((result) => {
            });
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, '')
            .then((result) => {
            });
    }
}


export const BlueButton = (p) => {
    const {text, onPress} = p;
    return (<TouchableOpacity
        onPress={onPress}
        style={{backgroundColor: '#66abfa', paddingVertical: 5, paddingHorizontal: 10, marginTop: 10}}
    >
        <Text style={{color: '#fff', fontSize: 14}}>{text}</Text>
    </TouchableOpacity>)
};

BlueButton.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
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
});
