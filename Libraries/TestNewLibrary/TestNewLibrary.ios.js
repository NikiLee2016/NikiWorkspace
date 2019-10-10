/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Stub of TestNewLibrary for Android.
 *
 * @format
 * @flow strict-local
 */

'use strict';

const NativeTestNewLibrary = require('NativeModules').TestNewLibrary;

/**
 * High-level docs for the TestNewLibrary iOS API can be written here.
 */

const TestNewLibrary = {
  test: function() {
    NativeTestNewLibrary.test();
  },
};

module.exports = TestNewLibrary;
