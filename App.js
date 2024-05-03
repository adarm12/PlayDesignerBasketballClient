import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";


class App extends React.Component {
  state = {
    apiDomain: "http://172.20.10.4:9124/",
    username: "",
    password: "",
    check: "check",
  }

  onValueChange = (key, text) => {
    this.setState({
      [key]: text
    })
  }



  clicked = () => {
    this.setState({
      check: "work"
    });

    const username = this.state.username;
    const password = this.state.password;

      console.log("11111, ", username)
      console.log("11111, ", password)
      axios.post(
          this.state.apiDomain+'add-user',
          {},
          {
              params: {
                  username,
                  password
              }
          }
      )
          .then(response => {
              console.log("22222", username)
              // return success(response);
          })
          .catch(error => {
              // return fail(error);
          });


      // axios.post(this.state.apiDomain+'add-user', null, {
      //     params: {
      //         username,
      //         password
      //     }
      // })
      //     .then(response => {
      //         console.log('Response status:', response.status);
      //     })
      //     .catch(error => {
      //         if (error.response) {
      //             console.error('Error Data:', error.response.data);
      //             console.error('Error Status:', error.response.status);
      //         } else if (error.request) {
      //             console.error('Error Request:', error.request);
      //         } else {
      //             console.error('Error Message:', error.message);
      //         }
      //         console.error('Error Config:', error.config);
      //     });
      //

  }




  render() {
    return (
        <View style={styles.container}>
          <Text>{this.state.check}</Text>
          <Text>username: </Text>
          <TextInput value = {this.state.username} onChangeText={(text) => this.onValueChange("username", text)}   style={styles.input}></TextInput>
          <Text>password: </Text>
          <TextInput value = {this.state.password} onChangeText={(text) => this.onValueChange("password", text)}   style={styles.input}></TextInput>



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