/**
 * React Native Demo by ninghao.net
 * https://github.com/ninghao/NinghaoReactNative
 */
'use strict';
import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import DrawerDemo from './ant-design/Drawer';
import ButtonDemo from './ant-design/Button';
import CheckboxDemo from './ant-design/Checkbox';
import TabsDemo from './ant-design/Tabs';

const AntDesignReactNative: () => React$Node = () => {
    return (
      <>
        {/* <DrawerDemo /> */}
        {/* <ButtonDemo /> */}
        {/* <CheckboxDemo /> */}
        <TabsDemo />
      </>
    );
}

export default AntDesignReactNative
