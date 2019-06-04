/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
let a=0;
export default class GeoLoc extends Component {

    constructor(props){
        super(props);
        this.state={
            geoLocation:'weloo'
        }
    }


    geoLocation() {
        const that = this;
        Geolocation.getCurrentPosition(
            position => {
                const initialPosition = JSON.stringify(position);
                a++;
                console.log("Get Position:  "+a + initialPosition);
                this.setState({geoLocation : initialPosition})
                setTimeout(function(){ that.geoLocation()},5000)
            },
            error => {
                Alert.alert('Error', JSON.stringify(error))

                setTimeout(function(){ that.geoLocation()},5000)
            }

        );

        // this.watchID = Geolocation.watchPosition(position => {
        //     const lastPosition = JSON.stringify(position);
        //     console.log("watchPosition:  " + lastPosition);
        // });
    }


    componentDidMount() {
        this.requestGeoLocationPermission();
        this.geoLocation();
    }

    render() {
        return (
            <View>
                <Text>{this.state.geoLocation}</Text>
            </View>
        );
    }

    async requestGeoLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Cool Photo App Camera Permission',
                    message:
                        'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
}
