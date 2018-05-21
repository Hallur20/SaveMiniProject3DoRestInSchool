import React, { Component } from 'react';
import { createApolloFetch } from 'apollo-fetch'

const ApolloFetch = createApolloFetch({
  uri: 'http://hallur.dk:3000/graphql'
})



class App extends Component {

  constructor() {
    super();
    this.state = { data: "change this...", userName: "", loggedIn: false, username: "", password: ""}
  }
  componentWillMount() {
    ApolloFetch({
      query: '{locationBlogs {info}}',
    }).then(function (response) {
      return response.data;
    }).then((yo) => {
      var key = 0;
      var test = yo.locationBlogs.map((element) => { key++; return <p key={key}>{element.info}</p> });
      this.setState({ data: test })
    })

    ApolloFetch({
      query: '{customerUserName(userName: "hvn21") {userName}}'
    }).then((response) => {
      return response.data;
    }).then((ey) => {
      this.setState({ userName: ey.customerUserName.userName });
    })
  }

  createFakeMarkerForApp = (event) => {

    fetch('http://hallur.dk:3000/createTestData')
      .then(function (response) {
        return response.text();
      }).then((data) => {
        alert(data);
      })
  }
  test = (e) => {
    ApolloFetch({
      query: '{customerUserName(userName:"' + this.state.username + '"){password id}}'
    }).then((x) => {
      alert("qwe");
      var password = x.data.customerUserName.password;
      if (password === this.state.password) {
        alert("correct!");
        this.setState({ loggedIn: true})
      } else {
        alert("wrong!");
      }
    })
    e.preventDefault();
  }
  hmm = () => {
    this.setState({ loggedIn: false, username: "", password: "" });
  }
  
  hehe = () => {
    navigator.geolocation.getCurrentPosition((successfully, error) => {
      if(error){
          alert("error! have you turned gps on?");
          return;
      }
      alert(successfully.coords.longitude + "," + successfully.coords.latitude);
  });
  }
  render() {


    return (
      <div className="App">
        <h1>hello world</h1>
        {this.state.data}
        <button onClick={this.createFakeMarkerForApp}>click here to add fake positions in order to show other markers on the reac-native app!</button>
        <p>username from apollo fetch: {this.state.userName}</p>

        <div>
          {this.state.loggedIn ? (
            <div>
              <p>you are logged in as : {this.state.username} which has id: {this.state.id}</p>
              <button onClick={this.hmm}>log out</button>
            </div>
          ) : (
              <form onSubmit={this.test} method="get">
                <input placeholder="type username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                <input placeholder="type password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                <input type="submit" value="login" />
              </form>
            )}
        </div>
      </div>
    );
  }
}

export default App;
