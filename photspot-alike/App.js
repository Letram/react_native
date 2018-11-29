import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, MapView} from 'expo';
import {Marker} from 'react-native-maps';
export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    markers: [{
      title: 'FINISH',
      description: 'You have found me!',
      coordinates: {
       latitude: 14.548100,
       longitude: 121.049906
      }, 
   }]
  };
  onRegionChange = (region) => {
    this.setState({ region });
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { locationStatus } = await Permissions.askAsync(Permissions.LOCATION);

    this.setState({ 
      hasCameraPermission: status === 'granted',
      hasLocationPermission: locationStatus === 'granted',
   });
  }
  takePic = ()=>{
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos);
        this.setState({region:{
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}); 
        console.log(this.state.region); 
      });
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { hasLocationPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.5,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.takePic}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Take Picture{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
                <MapView
                  style={{ flex: 1 }}
                  region={this.state.region}
                >
                </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: { 
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center', 
  },
    capture: { 
      flex: 0, 
      backgroundColor: '#fff', 
      borderRadius: 5, 
      color: '#000', 
      padding: 10, 
      margin: 40
    }
});
