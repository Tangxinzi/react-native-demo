import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner
} from 'react-native-admob';
import GlobalStyles from "../GlobalStyles"

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // 激励广告
    AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
    AdMobRewarded.setAdUnitID('ca-app-pub-8061733603127258/1003049469');
    AdMobRewarded.addEventListener('rewarded', reward => console.log('AdMobRewarded => rewarded', reward));
    AdMobRewarded.addEventListener('adLoaded', () => console.log('AdMobRewarded => adLoaded'));
    AdMobRewarded.addEventListener('adFailedToLoad', error => console.warn(error));
    AdMobRewarded.addEventListener('adOpened', () => console.log('AdMobRewarded => adOpened'));
    AdMobRewarded.addEventListener('videoStarted', () => console.log('AdMobRewarded => videoStarted'));
    AdMobRewarded.addEventListener('adClosed', () => {
      console.log('AdMobRewarded => adClosed');
      AdMobRewarded.requestAd().catch(error => console.warn(error));
    });
    AdMobRewarded.addEventListener('adLeftApplication', () => console.log('AdMobRewarded => adLeftApplication'));
    AdMobRewarded.requestAd().catch(error => console.warn(error));

    // 插屏广告
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.setAdUnitID('ca-app-pub-8061733603127258/3820784491');
    AdMobInterstitial.addEventListener('adLoaded', () => console.log('AdMobInterstitial adLoaded'));
    AdMobInterstitial.addEventListener('adFailedToLoad', error => console.warn(error));
    AdMobInterstitial.addEventListener('adOpened', () => console.log('AdMobInterstitial => adOpened'));
    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('AdMobInterstitial => adClosed');
      AdMobInterstitial.requestAd().catch(error => console.warn(error));
    });
    AdMobInterstitial.addEventListener('adLeftApplication', () => console.log('AdMobInterstitial => adLeftApplication'));
    AdMobInterstitial.requestAd().catch(error => console.warn(error));
  }

  componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    AdMobInterstitial.removeAllListeners();
  }

  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.warn(error));
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.header}>
          <Text style={GlobalStyles.headerTitle} allowFontScaling={false}>AdMob</Text>
          <Text style={GlobalStyles.headerSubTitle} allowFontScaling={false}>react-native-admob</Text>
        </View>
        <View style={[GlobalStyles.body, GlobalStyles.bodyContent]}>
          <TouchableHighlight onPress={this.showRewarded} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
            <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Rewarded Video</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.showInterstitial} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
            <Text style={GlobalStyles.buttonText} allowFontScaling={false}>Interstitial</Text>
          </TouchableHighlight>
          <AdMobBanner
            adSize="banner" // largeBanner mediumRectangle fullBanner leaderboard smartBannerPortrait smartBannerLandscape
            style={styles.admob}
            adUnitID="ca-app-pub-8061733603127258/5708581232"
          />
          <AdMobBanner
            adSize="largeBanner"
            style={styles.admob}
            adUnitID="ca-app-pub-8061733603127258/5708581232"
          />
          <PublisherBanner
            adSize="banner"
            style={[styles.admob, { height: 50, width: '100%' }]}
            adUnitID="ca-app-pub-8061733603127258/5708581232"
            onAdFailedToLoad={error => {
              console.warn(error);
            }}
            onAppEvent={event => {
              if (event.name === 'color') {
                this.setState({
                  appEventsExampleStyle: { backgroundColor: event.info },
                });
              }
            }}
            ref={el => (this._appEventsExample = el)}
          />
          <AdMobBanner
            adSize="leaderboard"
            style={styles.admob}
            adUnitID="ca-app-pub-8061733603127258/5708581232"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  admob: {
    marginBottom: 20
  }
})
