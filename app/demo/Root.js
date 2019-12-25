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
import SwitchDemo from './ant-design/Switch';

const AntDesignReactNative: () => React$Node = () => {
    return (
      <>
        {/* <DrawerDemo /> */}
        {/* <ButtonDemo /> */}
        {/* <CheckboxDemo /> */}
        {/* <TabsDemo /> */}
        <SwitchDemo />
      </>
    );
}

export default AntDesignReactNative
