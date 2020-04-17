import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableHighlight,
  Alert,
  ActivityIndicator
} from 'react-native'
import CodePush from "react-native-code-push"
import GlobalStyles from "../GlobalStyles";

type Props = {}
// noinspection JSAnnotator
export default class App extends Component<Props> {

  state = {
    receivedBytes: 0,
    totalBytes: 0,
    showProcess: false,
    showIndicator: false
  }

  _handleUpdate = async () => {
    this.setState({showIndicator: true})

    // checkForUpdate 返回promise，包含了服务端安装包的各种信息，包的大小版本之类的,
    // 如果要构建构建个性化更新界面，需要用到此方法
    const updateMessage = await CodePush.checkForUpdate() || {}

    // 执行更新
    await CodePush.sync(
    // 第一个参数吗，是个对象，可定义更新的动作
    {
      // 安装模式 'IMMEDIATE' 立刻安装， ON_NEXT_RESUME 下次启动安装
      installMode: CodePush.InstallMode.ON_NEXT_RESUME,

      // 强制更新模式下的安装，默认是IMMEDIATE 直接安装
      mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,

      //更新确认弹窗设置，设置系统自带弹窗中的内容
      updateDialog: {
        mandatoryUpdateMessage: updateMessage.description,
        mandatoryContinueButtonLabel: '强制更新',
        optionalIgnoreButtonLabel: '取消',
        optionalInstallButtonLabel: '安装',
        optionalUpdateMessage: updateMessage.description,
        title: '发现新版本'
      }
    },
    // 第二个参数，更新状态检测，返回数字
    (status) => {
      // 0 已经是最新，1 安装完成、等待生效，2 忽略更新，3 未知错误，4 已经在下载了，5 查询更新，6 弹出了更新确认界面，7 下载中，8 下载完成
      switch (status) {
        case 0:
          Alert.alert('已经是最新版本')
          break
        case 1:
          !updateMessage.isMandatory && Alert.alert('已更新，请重启应用')
          break
        case 3:
          Alert.alert('出错了，未知错误')
          break
        case 7:
          this.setState({showProcess: true})
          break
        case 8:
          this.setState({showProcess: false})
          break
      }
    },
    // 第三个参数，检测下载过程
    ({receivedBytes, totalBytes}) => {
      // console.log('DownloadProgress: ', receivedBytes, totalBytes)
      this.setState({
        receivedBytes: (receivedBytes / 1024).toFixed(2),
        totalBytes: (totalBytes / 1024).toFixed(2)
      })
    })
    this.setState({showIndicator: false})
  }

  handleUpdate = async () => this._handleUpdate().catch((error) => {
    this.setState({showIndicator: false})
    Alert.alert('网络错误')
  })

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.header}>
          <Text style={GlobalStyles.headerTitle} allowFontScaling={false}>热更新</Text>
          <Text style={GlobalStyles.headerSubTitle} allowFontScaling={false}>react-native-code-push</Text>
        </View>
        <View style={[GlobalStyles.body, GlobalStyles.bodyContent]}>
          {
            !this.state.showIndicator ?
              <TouchableHighlight onPress={this.handleUpdate} style={GlobalStyles.button} activeOpacity={0.7} underlayColor='#000'>
                <Text style={GlobalStyles.buttonText} allowFontScaling={false}>CodePush</Text>
              </TouchableHighlight>
            :
              <ActivityIndicator size={'large'} color={'#000000'} />
          }

          {
            this.state.showProcess &&
              <View style={styles.processing}>
                <View style={styles.line}>
                  <Text style={{ borderRadius: 15, backgroundColor: '#000000', width: parseInt(this.state.receivedBytes / this.state.totalBytes * 100 || 0) }} allowFontScaling={false}></Text>
                </View>
                <Text style={styles.ratio} allowFontScaling={false}>下载进度：{this.state.receivedBytes} kb / {this.state.totalBytes} kb</Text>
              </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  processing: {
    width: '100%',
    padding: 20
  },
  line: {
    width: '100%',
    height: 5,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#e7e7e7'
  },
  ratio: {
    color: '#000000',
    textAlign: 'center',
    fontWeight: '600'
  }
})
