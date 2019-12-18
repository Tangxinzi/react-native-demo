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
 StatusBar,
 ImageBackground
} from 'react-native';

import Colors from './components/Colors';
import LearnMoreLinks from './components/LearnMoreLinks';
import DebugInstructions from './components/DebugInstructions';
import ReloadInstructions from './components/ReloadInstructions';

import {
	useDarkModeContext,
	DynamicValue,
	useDynamicStyleSheet,
	DynamicStyleSheet,
	DarkModeProvider,
	useDynamicValue,
	eventEmitter,
} from 'react-native-dark-mode'

eventEmitter.on('currentModeChanged', newMode => console.log(newMode))

export default function App() {
	const mode = useDarkModeContext()
	const styles = useDynamicStyleSheet(dynamicStyleSheet)
	const logo = useDynamicValue(require('./logoLight.png'), require('./logoDark.png'))

	return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <ImageBackground
        accessibilityRole={'image'}
        source={require('./components/logo.png')}
        style={styles.background}
        imageStyle={styles.logo}>
        <Text style={styles.text}>Welcome to React</Text>
      </ImageBackground>
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
	)
}

const dynamicStyleSheet = new DynamicStyleSheet({
  scrollView: {
    backgroundColor: new DynamicValue(Colors.white, Colors.dark),
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    backgroundColor: new DynamicValue(Colors.white, Colors.dark),
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: new DynamicValue(Colors.dark, Colors.white),
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
    color: new DynamicValue(Colors.dark, Colors.white),
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: new DynamicValue(Colors.dark, Colors.white),
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: new DynamicValue(Colors.lighter, Colors.dark),
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    /*
     * These negative margins allow the image to be offset similarly across screen sizes and component sizes.
     *
     * The source logo.png image is 512x512px, so as such, these margins attempt to be relative to the
     * source image's size.
     */
    marginLeft: -128,
    marginBottom: -192,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: new DynamicValue(Colors.black, Colors.white)
  },
})
