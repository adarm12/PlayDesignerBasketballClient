import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";


class App extends React.Component {
  state = {
    apiDomain: "http://localhost:9124/",
    username: "",
    password: "",
    check: "check",
  }

  // onValueChange = (key, event) => {
  //   this.setState({
  //     [key]: event.target.value
  //   })
  // }
  // clicked = () => {
  //   this.setState({
  //     check: "work"
  //   });
  //
  //   axios.post(this.state.apiDomain + add-user, null, {
  //     params: {
  //       username: this.state.username,
  //       password: this.state.password
  //     }
  //   })
  //       .then(response => {
  //         console.log("Response status:", response.status);
  //       })
  //       .catch(error => {
  //         console.error("Error:", error);
  //       });
  // }




  render() {
    return (
        <View style={styles.container}>
          <Text>{this.state.check}</Text>
          <Text>username: </Text>
          <TextInput value = {this.state.username} onChange={(event) => this.onValueChange("username", event)}   style={styles.input}></TextInput>
          <Text>password: </Text>
          <TextInput value = {this.state.password} onChange={(event) => this.onValueChange("password", event)}   style={styles.input}></TextInput>



          <TouchableOpacity onPress = {this.clicked} style={styles.button}>
            <Text>
              Button
            </Text>
          </TouchableOpacity>

          <StatusBar style="auto" />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10,
    width: 200,
  },
  button: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default App;