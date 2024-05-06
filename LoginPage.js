import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React from 'react'
import {sendApiPostRequest} from "./ApiRequests";
import SearchUser from "./SearchUser";


class LoginPage extends React.Component {
        state = {
            apiDomain: "",
            username: "",
            password: "",
            loginSuccess: false,
            userSecret: "",
            errorCode: "",
        }

    login = () => {
        console.log(this.state.username);
        console.log(this.state.password);
        sendApiPostRequest(this.state.apiDomain + '/login', {
            username: this.state.username,
            password: this.state.password,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success) {
                console.log('You have successfully connected');
                console.log(response.data.user.secret);
                this.setState({loginSuccess: true});
                this.setState({userSecret: response.data.user.secret});
            }
            this.setState({errorCode: response.data.errorCode})
        })
    }

    errorCodeMessage = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case 0:
                errorMessage = "You have successfully connected";
                break;
            case 9:
                errorMessage = "User name does not exits";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 5:
                errorMessage = "Incorrect password";
                break;
        }
        return errorMessage;
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.loginSuccess ?
                    <View style={styles.container}>
                        <Text style={styles.heading}>Login</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="username"
                            secureTextEntry={true}
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
                        <TouchableOpacity onPress={this.login} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <Text>{this.errorCodeMessage()}</Text>
                    </View>
                    :
                    <View style={styles.container}>
                        <SearchUser stateFromLogin={this.state}></SearchUser>
                    </View>
                }

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
        width: 200,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
        width: 100,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default LoginPage;