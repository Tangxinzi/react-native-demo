/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react'
import {
  Alert,
  Button,
  Platform,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import Share from 'react-native-share'
import images from './imagesBase64'
import GlobalStyles from "../GlobalStyles"

const App = () => {
  const [packageSearch, setPackageSearch] = useState<string>('')
  const [result, setResult] = useState<string>('')

  /**
   * You can use the method isPackageInstalled to find if a package is installed.
   * It returns an object { isInstalled, message }.
   * Only works on Android.
   */
  const checkIfPackageIsInstalled = async () => {
    const {isInstalled} = await Share.isPackageInstalled(packageSearch)

    Alert.alert(
      `Package: ${packageSearch}`,
      `${isInstalled ? 'Installed' : 'Not Installed'}`,
    )
  }

  function getErrorString(error, defaultValue) {
    let e = defaultValue || 'Something went wrong. Please try again'
    if (typeof error === 'string') {
      e = error
    } else if (error && error.message) {
      e = error.message
    } else if (error && error.props) {
      e = error.props
    }
    return e
  }

  /**
   * This functions share multiple images that
   * you send as the urls param
   */
  const shareMultipleImages = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      urls: [images.image1, images.image2],
    }

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log('Error =>', error)
      setResult('error: '.concat(getErrorString(error)))
    }
  }

  /**
   * This functions share a image passed using the
   * url param
   */
  const shareEmailImage = async () => {
    const shareOptions = {
      title: 'Share file',
      email: 'email@example.com',
      social: Share.Social.EMAIL,
      failOnCancel: false,
      urls: [images.image1, images.image2],
    }

    try {
      const ShareResponse = await Share.open(shareOptions)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log('Error =>', error)
      setResult('error: '.concat(getErrorString(error)))
    }
  }

  /**
   * This functions share a image passed using the
   * url param
   */
  const shareSingleImage = async () => {
    const shareOptions = {
      title: 'Share file',
      url: images.image1,
      failOnCancel: false,
    }

    try {
      const ShareResponse = await Share.open(shareOptions)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log('Error =>', error)
      setResult('error: '.concat(getErrorString(error)))
    }
  }

  /**
   * This function shares PDF and PNG files to
   * the Files app that you send as the urls param
   */
  const shareToFiles = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
      urls: [images.image1, images.pdf1], // base64 with mimeType or path to local file
    }

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log('Error =>', error)
      setResult('error: '.concat(getErrorString(error)))
    }
  }

  const shareToInstagramStory = async () => {
    const shareOptions = {
      title: 'Share image to instastory',
      method: Share.InstagramStories.SHARE_BACKGROUND_IMAGE,
      backgroundImage: images.image1,
      social: Share.Social.INSTAGRAM_STORIES,
    }

    try {
      const ShareResponse = await Share.shareSingle(shareOptions)
      setResult(JSON.stringify(ShareResponse, null, 2))
    } catch (error) {
      console.log('Error =>', error)
      setResult('error: '.concat(getErrorString(error)))
    }
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerTitle} allowFontScaling={false}>分享</Text>
        <Text style={GlobalStyles.headerSubTitle} allowFontScaling={false}>react-native-share</Text>
      </View>
      <View style={[GlobalStyles.body, GlobalStyles.bodyContent]}>
        <TouchableHighlight onPress={shareMultipleImages} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Share Multiple Images</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={shareEmailImage} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Share Social: Email</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={shareToInstagramStory} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Share to IG Story</Text>
        </TouchableHighlight>
        {
          Platform.OS === 'ios' && (
            <TouchableHighlight onPress={shareToFiles} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
              <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Share To Files</Text>
            </TouchableHighlight>)
        }
        {
          Platform.OS === 'android' && (
            <View style={styles.searchPackageContainer}>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder="Search for a Package"
                  onChangeText={setPackageSearch}
                  allowFontScaling={false}
                  value={packageSearch}
                  style={styles.textInput}
                />
              </View>
              <TouchableHighlight onPress={checkIfPackageIsInstalled} style={[GlobalStyles.button, {width: '100%'}]} activeOpacity={0.7} underlayColor='#000'>
                <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Check Package</Text>
              </TouchableHighlight>
            </View>)
          }
        <Text style={styles.result} allowFontScaling={false}>{result}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: '#151313',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  result: {
    fontSize: 14,
    margin: 10,
  },
  textInputContainer: {
    width: '100%',
    margin: 10
  },
  searchPackageContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
})

export default App
