// import React from 'react';
// import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import axios from "axios";
//
// class Signup extends React.Component {
//     state = {
//         apiDomain: "http://172.20.10.4:9124/",
//         username: "",
//         password: "",
//         repeatPassword: "",
//         success: false,
//     }
//
//     onValueChange = (key, text) => {
//         this.setState({
//             [key]: text
//         });
//     }
//
//     same = () => {
//         return this.state.repeatPassword === this.state.password;
//     }
//
//     clicked = () => {
//         axios.post(this.state.apiDomain + 'add-user', null, {
//             params: {
//                 username: this.state.username,
//                 password: this.state.password
//             }
//         })
//             .then(response => {
//                 console.log('Response status:', response.status);
//             })
//             .catch(error => {
//                 if (error.response) {
//                     console.error('Error Data:', error.response.data);
//                 }
//                 // console.error('Error Status:', error.response.status);
//                 // } else if (error.request) {
//                 //     console.error('Error Request:', error.request);
//                 // } else {
//                 //     console.error('Error Message:', error.message);
//                 // }
//                 // console.error('Error Config:', error.config);
//             });
//
//     }
//
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.heading}>Sign up Form</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Username"
//                     value={this.state.username}
//                     onChangeText={(text) => this.onValueChange("username", text)}
//                 />
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Password"
//                     secureTextEntry={true}
//                     value={this.state.password}
//                     onChangeText={(text) => this.onValueChange("password", text)}
//                 />
//                 <TextInput
//                     style={[styles.input, {backgroundColor: this.same() ? 'green' : 'red'}]}
//                     placeholder="Repeat Password"
//                     secureTextEntry={true}
//                     value={this.state.repeatPassword}
//                     onChangeText={(text) => this.onValueChange("repeatPassword", text)}
//                 />
//                 <TouchableOpacity onPress={this.clicked} style={styles.button}>
//                     <Text style={styles.buttonText}>Submit</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 10,
//         width: '80%',
//     },
//     button: {
//         backgroundColor: 'skyblue',
//         padding: 10,
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'white',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });
//
// export default Signup;
