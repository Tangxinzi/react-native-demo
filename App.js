import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import GlobalStyles from "./app/demo/GlobalStyles"

// import VideoProcessingScreen from './app/demo/video-processing/App';
import ShareScreen from './app/demo/share/App';
import CodePushScreen from './app/demo/code-push/App';
// import AudioWaveformScreen from './app/demo/audio-waveform/App';
import AdmobScreen from './app/demo/admob/App';
import NavigationScreen from './app/demo/navigation/App';
import BottomTabNavigatorScreen from './app/demo/navigation/bottomTabNavigator/App';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={[GlobalStyles.body, GlobalStyles.bodyContent]}>
        {/* <TouchableHighlight onPress={() => this.props.navigation.navigate('VideoProcessing')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>VideoProcessing</Text>
        </TouchableHighlight> */}
        <TouchableHighlight onPress={() => this.props.navigation.navigate('ShareScreen')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>ShareScreen</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('CodePush')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>CodePush</Text>
        </TouchableHighlight>
        {/* <TouchableHighlight onPress={() => this.props.navigation.navigate('AudioWaveform')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>AudioWaveform</Text>
        </TouchableHighlight> */}
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Admob')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Admob</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Navigation')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Navigation</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('BottomTabNavigator')} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
          <Text style={GlobalStyles.buttonText} allowFontScaling={false}>BottomTabNavigator</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    // VideoProcessing: {
    //   screen: VideoProcessingScreen
    // },
    Share: {
      screen: ShareScreen
    },
    CodePush: {
      screen: CodePushScreen
    },
    // AudioWaveform: {
    //   screen: AudioWaveformScreen
    // },
    Admob: {
      screen: AdmobScreen
    },
    Navigation: {
      screen: NavigationScreen
    },
    BottomTabNavigator: {
      screen: BottomTabNavigatorScreen
    }
  },
  {
    // mode: 'modal',
    // initialRouteName: 'BottomTabNavigator',
    // headerMode: 'none',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
