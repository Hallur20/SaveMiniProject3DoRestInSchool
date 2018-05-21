import React from 'react'
import {View, Button,StyleSheet} from 'react-native'
import MapView from 'react-native-maps';

export default class ProfileScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = { lat: 62.007864, lon: -6.790981699999975 }
    }
    static navigationOptions = {
      title: 'Profile',
    };
    render(

    ){
      const {navigate} = this.props.navigation;
      return(
        <View style={styles.container}>
          <Button onPress={()=> navigate('Home')} title="log out"/>
          <MapView style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                </MapView>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    map: {
        flex: 2

    },
    container:{
        flex: 1
    }
});