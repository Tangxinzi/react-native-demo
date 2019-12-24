/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TouchID from 'react-native-touch-id';

const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};

const pressHandler = () => {
  TouchID.authenticate('to demo this react-native component', optionalConfigObject)
    .then(success => {
      Alert.alert('Authenticated Successfully');
    })
    .catch(error => {
      Alert.alert('Authentication Failed');
    });
}

const clickHandler = () => {
  TouchID.isSupported()
    .then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
          Alert.alert('FaceID is supported.');
      } else if (biometryType === 'TouchID') {
          Alert.alert('TouchID is supported.');
      } else if (biometryType === true) {
        // Touch ID is supported on Android
      }
    })
    .catch(error => {
      // 如果用户的设备未启用 touchID 或 faceID，则为失败代码
      console.log(error);
    });
}

const style = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#fafafa',
  },
  button: {
    paddingVertical: 15,
    marginBottom: 15,
    width: 240,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  button__text: {
    color: '#fff',
    textAlign: 'center',
  },
});

const Root: () => React$Node = () => {
  if (true) {
    return (
      <View style={style.app}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          style={style.button}
          activeOpacity={0.9}
          onPress={() => {
            pressHandler()
          }}>
          <Text style={style.button__text}>Authenticate with Touch ID</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          activeOpacity={0.9}
          onPress={() => {
            clickHandler()
          }}>
          <Text style={style.button__text}>Authentication Device</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Root;
