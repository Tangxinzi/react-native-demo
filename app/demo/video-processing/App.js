import React, { Component } from "react"
import PropTypes from "prop-types";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableHighlight
} from "react-native";
import {
  VideoPlayer,
  Trimmer,
  ProcessingManager
} from "react-native-video-processing";
import ImagePicker from "react-native-image-picker";
import GlobalStyles from "../GlobalStyles"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: null,
      videoDuration: 0,
      currentTime: 0,
      startTime: 0,
      endTime: null,
      videoSize: null,
      loading: false
    };
  }
  //Pick video file
  pickDocument = () => {
    const options = {
      mediaType: "video"
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // console.log("response is", response);
        // getVideoInfo
        ProcessingManager.getVideoInfo(response.origURL).then(
          ({ duration, size, frameRate, bitrate }) => {
            this.setState({
              videoSize: size,
              videoDuration: duration,
              endTime: parseInt(duration),
              fileUri: response.origURL
            });
          }
        )
      }
    });
  };

  //Video trim
  trimVideo = () => {
    Alert.alert(
      "Trim video",
      "Do you want to trim?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => this.doTrim()
        }
      ],
      { cancelable: false }
    );
  };

  doTrim = () => {
    //start loading
    this.setState({
      loading: true
    });
    const options = {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      saveToCameraRoll: true, // default is false // iOS only
      saveWithCurrentDate: true // default is false // iOS only
    };
    this.videoPlayerRef
      .trim(options)
      .then(newSource => {
        //End loading
        this.setState({
          loading: false
        });
        console.log(newSource);
        Alert.alert("Successfully trimed ", `loaction: ${newSource}`);
      })
      .catch(() => {
        //End loading
        this.setState({
          loading: false
        });
      });
  };

  compressVideo() {
    const options = {
      width: 720,
      height: 1280,
      bitrateMultiplier: 3,
      saveToCameraRoll: true, // default is false, iOS only
      saveWithCurrentDate: true, // default is false, iOS only
      minimumBitrate: 300000,
      removeAudio: false // default is false
    };
    this.videoPlayerRef
      .compress(options)
      .then(newSource => console.log(newSource))
      .catch(console.warn);
  }

  trimmingTime = e => {
    //Convert the time using regular exp
    let fixed = this.state.videoDuration.toString().length;

    //Start time
    let startTime = e.startTime
      ? parseInt(
          e.startTime.toString().substring(0, fixed)
        )
      : 0;
    //End time
    let endTime = e.endTime
      ? parseInt(
          e.endTime.toString().substring(0, fixed)
        )
      : this.state.videoDuration;

    this.setState({
      startTime: startTime,
      endTime: endTime
    });
  }

  currentTime = nativeEvent => {
    console.log(nativeEvent)
    this.setState({
      currentTime: parseInt(nativeEvent.currentTime)
    })
  }

  render () {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.header}>
          <Text style={GlobalStyles.headerTitle} allowFontScaling={false}>视频剪辑</Text>
          <Text style={GlobalStyles.headerSubTitle} allowFontScaling={false}>react-native-video-processing</Text>
        </View>
        <View style={styles.flex}>
          {this.state.fileUri ? (
            <>
              <View style={styles.processing}>
                <VideoPlayer
                  ref={ref => (this.videoPlayerRef = ref)}
                  play={true} // default false
                  replay={false} // should player play video again if its ended
                  rotate={false} // use this prop to rotate video if it captured in landscape mode iOS only
                  source={this.state.fileUri}
                  playerWidth={Dimensions.get('window').width} // iOS only
                  playerHeight={this.state.videoSize.height / (this.state.videoSize.width / Dimensions.get('window').width)} // iOS only
                  // height={Dimensions.get('window').height}
                  resizeMode={VideoPlayer.Constants.resizeMode.COVER}
                  onChange={({ nativeEvent }) => this.currentTime(nativeEvent)} // get Current time on every second
                />
              </View>
              <View style={styles.trimmerView}>
                <View style={styles.trimmerTime}>
                  <Text style={{ color: '#FFF' }}>{`Stat From: ${ this.state.startTime } `}</Text>
                  <Text style={{ color: '#FFF' }}>{`- End: ${ this.state.endTime }  `}</Text>
                </View>
                <Trimmer
                  source={this.state.fileUri}
                  height={40}
                  width={Dimensions.get('window').width}
                  onTrackerMove={e => this.currentTime(e)} // iOS only
                  currentTime={this.state.currentTime} // use this prop to set tracker position iOS only
                  themeColor={'white'} // iOS only
                  thumbWidth={10} // iOS only
                  trackerColor={'#fff'} // iOS only
                  resizeMode={VideoPlayer.Constants.resizeMode.COVER}
                  onChange={e => this.trimmingTime(e)}
                />
                <View style={styles.trim}>
                  <Button title={"Trim Video"} onPress={() => this.trimVideo()} />
                </View>
              </View>
            </>
          ) : (
            <View style={GlobalStyles.body, GlobalStyles.bodyContent}>
              <TouchableHighlight onPress={() => this.pickDocument()} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
                <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Choose File</Text>
              </TouchableHighlight>
            </View>
          )}
        </View>
        {
          this.state.loading && <ActivityIndicator size="large" style={styles.loading} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  processing: {
    flex: 1,
    justifyContent: 'center'
  },
  trimmerTime: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  trimmerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 80
  },
  trim: {
    marginTop: 40
  },
  loading: {
    backgroundColor: "#FFF",
    opacity: 0.5,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignSelf: "center",
    zIndex: 2
  }
});
