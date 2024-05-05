import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";

import React from 'react'

class LoginPage extends React.Component {

    state = {
        userId: "",
        username: "",
        password: ""
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Login Form</Text>
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Username"*/}
                {/*    value={this.state.username}*/}
                {/*    onChangeText={(text) => this.onValueChange("username", text)}*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*    style={styles.input}*/}
                {/*    placeholder="Password"*/}
                {/*    secureTextEntry={true}*/}
                {/*    value={this.state.password}*/}
                {/*    onChangeText={(text) => this.onValueChange("password", text)}*/}
                {/*/>*/}
                <TouchableOpacity  style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>


        )
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


export default LoginPage;