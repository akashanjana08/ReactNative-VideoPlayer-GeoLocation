/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, ToastAndroid, Button } from 'react-native';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import Slider from '@react-native-community/slider';

export default class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pause: false,
      end: false,
      isBuffer: false
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Video source={{ uri: "http://mirrors.standaloneinstaller.com/video-sample/page18-movie-4.m4v" }}   // Can be a URL or a local file.
          ref={(ref) => { this.player = ref }}                                      // Store reference
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onError={this.videoError}
          paused={this.state.pause}          // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          onEnd={this.onEnd}
          repeat={this.state.end}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          onTimedMetadata={this.onTimedMetadata}
        />
        {this.state.isBuffer ? <View style={styles.progress}>
          <Progress.Circle size={30} indeterminate={true} />
        </View> : null}
        <View style={styles.footer}>
          <View style={styles.slider}>
            <TextInput
              ref={r => this.currentTime = r}
              editable={false}
              value='0:00'
              style={{ flex: 1, color: 'white', height: 40, textAlign: 'center' }} />

            <Slider
              ref={r => this.slider = r}
              style={{ flex: 4 }}
              minimumValue={0}
              minimumTrackTintColor="#29AB87"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={this._handleSlider}
            />
            <TextInput
              ref={r => this.durationTime = r}
              editable={false}
              value='0:00'
              style={{ flex: 1, color: 'white', height: 40, textAlign: 'center' }} />
          </View>
          <View style={styles.controller}>
            {/* <TouchableOpacity style={{ backgroundColor: 'transparent' }} >
              <Image
                style={styles.button}
                source={require('./fast_rewind_icon.png')}
              />
            </TouchableOpacity> */}

            <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={this.onPlayPause}>
              <Image
                style={styles.button}
                source={this.state.pause ? require('./play_icon_white.png') : require('./pause_icon_white.png')}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity style={{ backgroundColor: 'transparent' }} >
              <Image
                style={styles.button}
                source={require('./fast_forward_icon.png')}
              />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={this.onStop}>
              <Image
                style={styles.button}
                source={require('./stop_icon_white.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _handleSlider = (value) => {
    console.log('Handle Slider============================================' + value)
    this.player.seek(value, 50);
    this.currentTime.setNativeProps({ text: this.fancyTimeFormat(value) + '' });
  }

  onTimedMetadata=(data)=>{
    console.log('onTimedMetadata')
    console.log(data.metadata[0].value)
  }

  onProgress = (data) => {
    //console.log("=============" + data.currentTime + "======playableDuration" + data.playableDuration + '======seekableDuration' + this.fancyTimeFormat(data.seekableDuration))
    this.currentTime.setNativeProps({ text: this.fancyTimeFormat(data.currentTime) + '' });
    this.slider.setNativeProps({ value: data.currentTime });
    this.setState({ isBuffer: false })
  }

  onLoadStart = () => {
    //this.player.seek(120, 50);
  }
  onLoad = (data) => {
    debugger
    console.log("=============" + data.duration + "======Current" + data.currentPosition)
    this.slider.setNativeProps({ maximumValue: Math.round(data.duration) });
    this.setState({ isBuffer: false })
    this.durationTime.setNativeProps({ text: this.fancyTimeFormat(data.duration) + '' });
  }

  onEnd = () => {
    this.setState({ end: !this.state.end })
  }

  onPlayPause = () => {
    this.setState({ pause: !this.state.pause })
  }

  onBuffer = () => {
    this.setState({ isBuffer: true })
  }

  onStop = () => {
    console.log('this.player')
  }


fancyTimeFormat(time) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  footer: {
    width: '100%',
    height: 90,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  controller: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 20,
    marginLeft: 20,
    backgroundColor: 'transparent'
  },
  progress: {
    alignContent: 'center'
  },
  slider: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
