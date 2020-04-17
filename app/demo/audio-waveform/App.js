import React, { Component } from "react"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from "react-native"
import WaveformWrapper from "./WaveformWrapper"
import GlobalStyles from "../GlobalStyles"

export default class audioWave extends Component {
  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.header}>
          <Text style={GlobalStyles.headerTitle} allowFontScaling={false}>音频波形</Text>
          <Text style={GlobalStyles.headerSubTitle} allowFontScaling={false}>react-native-audiowaveform</Text>
        </View>
        <View style={GlobalStyles.body}>
          <WaveformWrapper autoPlay={false} style={styles.waveform} waveFormStyle={{
              waveColor: "lightsteelblue",
              scrubColor: "white"
            }} source={require('./wicked-games.m4a')} />
          <WaveformWrapper autoPlay={false} style={styles.waveform} waveFormStyle={{
              waveColor: "red",
              scrubColor: "white"
            }} source={require('./wicked-games.m4a')} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  waveform: {
    height: 60,
    marginBottom: 20,
    backgroundColor: "#000"
  }
})
