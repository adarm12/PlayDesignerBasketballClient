import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';

const Stack = createStackNavigator();

class App extends React.Component {
    state = {
        apiDomain: "http://172.20.10.4:9124/",
        username: "",
        password: "",
        repeatPassword: "",
        success: false,
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    same = () => {
        return this.state.repeatPassword === this.state.password;
    }

    registerClicked = () => {
        // Navigation to LoginPage
        this.navigation.navigate('LoginPage');
    }

    clicked = () => {
        axios.post(this.state.apiDomain + 'add-user', null, {
            params: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(response => {
                console.log('Response status:', response.status);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error Data:', error.response.data);
                }
            });

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Sign up Form</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={this.state.username}
                    onChangeText={(text) => this.onValueChange("username", text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.onValueChange("password", text)}
                />
                <TextInput
                    style={[styles.input, { backgroundColor: this.same() ? 'green' : 'red' }]}
                    placeholder="Repeat Password"
                    secureTextEntry={true}
                    value={this.state.repeatPassword}
                    onChangeText={(text) => this.onValueChange("repeatPassword", text)}
                />
                <TouchableOpacity onPress={this.clicked} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.registerClicked} style={styles.button}>
                    <Text style={styles.buttonText}>To register</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});

function AppWrapper() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={App} />
                <Stack.Screen name="Login" component={LoginPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppWrapper;
