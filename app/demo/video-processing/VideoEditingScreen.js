import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import styles from "./VideoEditingScreenStyleSheet";
//Third party
import {
  VideoPlayer,
  Trimmer,
  ProcessingManager
} from "react-native-video-processing";
import ImagePicker from "react-native-image-picker";

class VideoEditingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUri: null,
      videoDuration: 0,
      startTime: 0,
      endTime: null,
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
        console.log("response is", response);
        //Get duration
        ProcessingManager.getVideoInfo(response.path).then(
          ({ duration, size, frameRate, bitrate }) => {
            console.log(duration);
            this.setState({
              videoDuration: duration,
              endTime: duration
            });
          }
        );
        this.setState({
          fileUri: response.path
        });
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
      removeAudio: true // default is false
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
          e.startTime
            .toString()
            .substring(2)
            .substring(0, fixed)
        )
      : 0;
    //End time
    let endTime = e.endTime
      ? parseInt(
          e.endTime
            .toString()
            .substring(2)
            .substring(0, fixed)
        )
      : this.state.videoDuration;

    this.setState({
      startTime: startTime,
      endTime: endTime
    });
  };
  render() {
    //"/storage/emulated/0/christian/videoplayback.mp4"
    return (
      <View style={styles.flex}>
        <View style={styles.container}>
          {this.state.fileUri ? (
            <View>
              <VideoPlayer
                ref={ref => (this.videoPlayerRef = ref)}
                play={true} // default false
                replay={true} // should player play video again if its ended
                rotate={true} // use this prop to rotate video if it captured in landscape mode iOS only
                source={this.state.fileUri}
                playerWidth={300} // iOS only
                playerHeight={500} // iOS only
                height={300}
                resizeMode={VideoPlayer.Constants.resizeMode.COVER}
                onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
              />

              <View style={styles.textView}>
                <Text>{`Stat From: ${this.state.startTime} `}</Text>
                <Text>{`To End: ${this.state.endTime}  `}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.trimmerView}>
                  <Trimmer
                    source={this.state.fileUri}
                    resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
                    onChange={e => this.trimmingTime(e)}
                  />
                </View>
              </View>
              <Button title={"Trim Video"} onPress={() => this.trimVideo()} />
            </View>
          ) : (
            <Button title={"Choose File"} onPress={() => this.pickDocument()} />
          )}
        </View>
        {this.state.loading && (
          <ActivityIndicator size="large" color="red" style={styles.loading} />
        )}
      </View>
    );
  }
}

export default VideoEditingScreen;
