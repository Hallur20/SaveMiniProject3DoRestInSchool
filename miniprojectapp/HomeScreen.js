import React from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
var a;
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = { userName: "hvn20", passWord: "123", distance: 1, lat: 62.007864, lon: -6.790981699999975, repo: { state: "nothing" } }
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((successfully, error) => {
            this.setState({
                lat: parseFloat(successfully.coords.latitude), lon: parseFloat(successfully.coords.longitude)
            });
        })
    }

    returnTrue = () => {
        alert("works");
        //plan is to send mobile data to react somehow... fetch maybe?, and then with express use the addlocationwithphone method.
        var sendThis = this.state;
        var data = new FormData();
        /*data.append("uname", sendThis.userName);
        data.append("password", sendThis.passWord);
        data.append("radius", sendThis.distance);
        data.append("lon", sendThis.lon);
        data.append("lat", sendThis.lat);
        */
        data.append("json", JSON.stringify(sendThis));
        fetch('hallur.dk:3000/phoneLogin', {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((res) => {
            return res.json();
        }).then((data) => {

            a = data.friends.filter((inside) => { return inside.username !== this.state.userName })
        })
            .catch((err) => { })

    }

    render() {
        const { navigate } = this.props.navigation;
        var friends = [];
        var countKeys = 0;
        if (this.state.repo.state !== "nothing") {
            for (var i = 0; i < this.state.repo.length; i++) {
                var username = this.state.repo[i].username;
                var lat = this.state.repo[i].latitude;
                var lon = this.state.repo[i].longitude;
                friends.push(<Marker key={countKeys} coordinate={{ latitude: lat, longitude: lon }}
                    title={username}
                    description={"description for user: " + username}
                />);
                countKeys++;
            }


        }
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    region={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: this.state.lat, longitude: this.state.lon }}
                        title="you"
                        description="this is your position"
                    />
                    {friends}

                </MapView>

                <TextInput
                    placeholder="enter username"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(username) => this.setState({ userName: username })}
                    value={this.state.userName}
                />
                <TextInput
                    placeholder="enter password"
                    onChangeText={(password) => this.setState({ passWord: password })}
                    value={this.state.passWord}
                />
                <TextInput
                    placeholder="enter maximum km"
                    keyboardType='numeric'
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(radius) => this.setState({ radius: radius })}
                    value={this.state.radius}
                />
                <Button onPress={() => {
                    var arr;

                    fetch('http://hallur.dk:3000/phoneLogin', {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.state)
                    }).then((res) => {
                        return res.json();
                    }).then((data) => {
                        console.log(data);
                        var arr = data.friends.filter((inside) => { return inside.username !== this.state.userName });
                        this.setState({ repo: arr });
                        console.log(this.state.repo);
                    })
                        .catch((err) => { })
                    //navigate('Profile')
                    //}

                }} title="login and see other markers!" />


            </View>
        );
    }

}
const styles = StyleSheet.create({
    map: {
        flex: 2
    },
    container: {
        flex: 1
    }
});