/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { BackHandler,ToastAndroid } from 'react-native';
import VideoPlayer from './videoPlayer';
import FlexPractice from './flex.practice';
import ShareExample from './share';
import GeoLoc from './geolocation';
let backClick = 0;
export default class App extends Component {
 
  componentDidMount(){
    BackHandler.addEventListener('backHandler',function(){
       if(backClick===0){
         ToastAndroid.show('Again click',ToastAndroid.SHORT);
         backClick++;
       }else{
         
       }
    })
  }

  componentWillMount(){
    BackHandler.removeEventListener();
  }

  render() {
    return (
      // <FlexPractice/>
      //<ShareExample/>
      <GeoLoc/>
    );
  }
}
