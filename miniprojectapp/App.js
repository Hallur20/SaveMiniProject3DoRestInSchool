import React from 'react';
import { StackNavigator, navigationOptions } from 'react-navigation';
import HomeScreen from './HomeScreen'
import ProfileScreen from './ProfileScreen'
//if i need api key: AIzaSyBVU_d985mj7MmTfP2Qe-H7oT1MIQ2ja78


const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
}
);
export default class App extends React.Component {
  render() {
    return (
      <NavigationApp />
    );
  }
}

