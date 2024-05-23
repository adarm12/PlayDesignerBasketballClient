import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";

class SignUp extends React.Component {
    state = {
        apiDomain: "",
        username: null,
        password: null,
        repeatPassword: null,
        success: false,
        errorCode: "",
    }

    componentDidMount() {
        this.setState({apiDomain: this.props.domain})
    }

    onValueChange = (key, value) => {
        this.setState({[key]: value});
    }

    // same = () => {
    //     return this.state.repeatPassword === this.state.password;
    // }

    signUp = () => {
        console.log(this.state.username);
        console.log(this.state.password);
        sendApiPostRequest(this.state.apiDomain + '/sign-up', {
            username: this.state.username,
            password: this.state.password,
            repeatPassword: this.state.repeatPassword,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success) {
                console.log('You have successfully signed up');
            }
            this.setState({errorCode: response.data.errorCode})
        })
    }

    errorCodeMessage = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case -1:
                errorMessage = "You have successfully signed up";
                break;
            case 0:
                errorMessage = "There are missing fields";
                break;
            case 1:
                errorMessage = "The username is taken";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 14:
                errorMessage = "No repeat password entered";
                break;
            // case 6:
            //     errorMessage = "Password length should be at least 8";
            //     break;
            // case 7:
            //     errorMessage = "Password should contain ! or @";
            //     break;
            case 8:
                errorMessage = "Repeat password does not match";
                break;
        }
        return errorMessage;
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.goBack} style={styles.button}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
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
                    style={[styles.input, {backgroundColor: (this.state.errorCode === 2) ? 'green' : 'red'}]}
                    placeholder="Repeat Password"
                    secureTextEntry={true}
                    value={this.state.repeatPassword}
                    onChangeText={(text) => this.onValueChange("repeatPassword", text)}
                />
                <TouchableOpacity onPress={this.signUp} style={styles.button}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text>{this.errorCodeMessage()}</Text>
                <TouchableOpacity onPress={() => this.setState({login: !this.state.login})}
                                  style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
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
        backgroundColor: '#ccc',
    },
    button: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SignUp;

