import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Alert, TouchableOpacity,TextInput, Dimensions} from 'react-native';
import MapView,{PROVIDER_GOOGLE, Callout} from 'react-native-maps';


const {width, height} = Dimensions.get('window')

export default class App extends Component {
  constructor(){
    super()

    this.state={
      region:{
        latitude: "",
        longitude: "",
        latitudeDelta: "",
        longitudeDelta: "",
        destination:""
      }
    }
  }

  calcDelta(lat, lon, acc){
      const oneDegOfLongInMeters = 111.32;
      const circumference = (40075/360)
      const latDelta = acc * (1/(Math.cos(lat) * circumference))
      const lonDelta = (acc / oneDegOfLongInMeters)

      this.setState({
        region:{
          latitude: lat,
          longitude: lon,
          latitudeDelta: latDelta,
          longitudeDelta: lonDelta
        }
      })
     

fetch('https://rajyamelec99.000webhostapp.com/currentlocation.php',
           
           
{
    method: 'POST',
    headers: 

    {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
    {
        latitude: this.state.region.latitude,
       

        longitude: this.state.region.longitude,
        
    }),

 

}).then((response) => response.json()).then((responseJson) =>
{

    alert(responseJson);
    
    this.setState({ loading: false, disabled: false });
}).catch((error) =>
{
    console.error(error);
    this.setState({ loading: false, disabled: false });
});
}


  


  componentWillMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const  acc= position.coords.accuracy

        this.calcDelta(lat, lon, acc)



      }
       )
      
    }
    

 

  //  insertion = () =>
  //  {
  //      this.setState({ loading: true, disabled: true }, () =>
  //      {
     //  Alert.alert(lon);
          
    
   
  
   marker(){
    return{
      latitude : this.state.region.latitude,
      longitude: this.state.region.longitude,
   
    }
  }
 
  render() {
    return (
      <View style={styles.container}>
      {/* <MapView                        //This is  for static location fetching 
      provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
      /> */}
      {this.state.region.latitude ? <MapView
      style={styles.map}
      initialRegion = {this.state.region}
      
     
      >
      
      <MapView.Marker
        coordinate={this.marker()}
     
        title = "Im here!"
        description = "Home"

      />
     
      
     
      </MapView>    : null } 
     
     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  map:{
    flex: 1,
    width: width
  },
  
});
