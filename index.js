/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TestTextInputPage from "./src/TestTextInputPage";
import TestNativeTextInputPage from "./src/TestNativeTextInputPage";

AppRegistry.registerComponent(appName, () => TestNativeTextInputPage);
