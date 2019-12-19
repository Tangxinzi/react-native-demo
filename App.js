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
  DeviceEventEmitter
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import QuickActions from "react-native-quick-actions";

QuickActions.setShortcutItems([
  {
    type: "Alarm", // Required
    title: "Alarm ICON", // Optional, if empty, `type` will be used instead
    subtitle: "Sets or displays an alarm.",
    icon: "Alarm", // Icons instructions below
    userInfo: {
      url: "app://alarm" // Provide any custom data like deep linking URL
    }
  },
  {
    type: "Bookmark",
    title: "Bookmark ICON",
    subtitle: "Creates a bookmark or shows bookmarks.",
    icon: "Bookmark",
    userInfo: {
      url: "app://bookmar"
    }
  },
  {
    type: "Confirmation",
    title: "Confirmation ICON",
    subtitle: "Denotes that an action is complete.",
    icon: "Confirmation",
    userInfo: {
      url: "app://confirmation"
    }
  },
  {
    type: "Love",
    title: "Love ICON",
    subtitle: "Denotes or marks an item as loved.",
    icon: "Love",
    userInfo: {
      url: "app://love"
    }
  },
]);

DeviceEventEmitter.addListener("quickActionShortcut", data => {
  console.log(data.title, data.type, data.userInfo)
});

QuickActions.isSupported((error, supported) => {
  if (!supported) {
    console.log("Device does not support 3D Touch or 3D Touch is disabled.");
  }
})

const App: () => React$Node = () => {
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

export default App;
