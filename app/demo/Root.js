/**
 * React Native Demo by ninghao.net
 * https://github.com/ninghao/NinghaoReactNative
 */
'use strict';
import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import DrawerDemo from './ant-design/Drawer';
import ButtonDemo from './ant-design/Button';

const AntDesignReactNative: () => React$Node = () => {
    return (
      <>
        {/* <DrawerDemo /> */}
        <ButtonDemo />
      </>
    );
}

export default AntDesignReactNative
