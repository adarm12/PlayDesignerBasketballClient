import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import LoginPage from './LoginPage';

class SignUp extends React.Component {
    state = {
        apiDomain: "",
        username: "",
        password: "",
        repeatPassword: "",
        success: false,
        login: false,
        errorMessage: "",
    }

    onValueChange = (key, value) => {
        this.setState({[key]: value});
    }

    changeLogin = () => {
        this.setState({login: !this.state.login});
    }
    same = () => {
        return this.state.repeatPassword === this.state.password;
    }

    signUp = () => {
        console.log(this.state.username);
        console.log(this.state.password);
        sendApiPostRequest(this.state.apiDomain + 'add-user', {
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success) {
                console.log('You have successfully signed up');
            }
            this.setState({errorMessage: response.data.errorCode})
        })
    }

    errorCodeMessage = () => {
        let errorMessage = "";
        switch (this.state.errorMessage) {
            case 0:
                errorMessage = "You have successfully signed up";
                break;
            case 1:
                errorMessage = "User name taken";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 8:
                errorMessage = "Repeat password does not match";
                break;
        }
        return errorMessage;
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.login ?
                    <View style={styles.container}>
                        <Text style={styles.heading}>Sign Up</Text>
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
                            style={[styles.input, {backgroundColor: this.same() ? 'green' : 'red'}]}
                            placeholder="Repeat Password"
                            secureTextEntry={true}
                            value={this.state.repeatPassword}
                            onChangeText={(text) => this.onValueChange("repeatPassword", text)}
                        />
                        <TouchableOpacity onPress={this.signUp} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <Text>{this.errorCodeMessage()}</Text>
                        <TouchableOpacity onPress={this.changeLogin} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.container}>
                        <LoginPage></LoginPage>
                    </View>
                }
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

export default SignUp;

