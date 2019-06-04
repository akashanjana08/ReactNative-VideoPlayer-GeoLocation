import React, { Component } from 'react'
import { View , StyleSheet, Text} from 'react-native';
export default class FlexPractice extends Component {
  render() {
    return (
      <View style={styles.container}>
         <View style={styles.view1}></View>
         <View style={styles.view2}></View>
         <View style={styles.view3}></View>
         <Text style={styles.textsty}>Happy</Text>
      </View>
    )
  }
}

const styles= StyleSheet.create({

    container:{
     flex:1,
     flexDirection:'row',
     backgroundColor:'red',
     justifyContent: 'space-between',
     alignItems:'center'
    },
    view1:{
        width:20,
        height:20,
        backgroundColor:'blue',
        
    },
    view2:{
        width:20,
        height:20,
        backgroundColor:'green'
     },
     view3:{
    width:20,
        height:20,
        backgroundColor:'yellow'
     },
     textsty:{
        color:'white',
        fontSize:40,
        fontStyle:'italic',
        fontWeight:'bold',
        writingDirection:'auto'
     }

})
