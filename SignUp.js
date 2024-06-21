import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import generalStyle from "./GeneralStyle";

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

    same = () => {
        return this.state.repeatPassword === this.state.password;
    }

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
            <View>
                <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                    <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                </TouchableOpacity>
                <View style={generalStyle.container}>
                    <Text style={generalStyle.heading}>Sign Up</Text>
                    <TextInput
                        style={generalStyle.input}
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={(text) => this.onValueChange("username", text)}
                    />
                    <TextInput
                        style={generalStyle.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.onValueChange("password", text)}
                    />
                    <TextInput
                        style={[generalStyle.input, {backgroundColor: this.same() ? 'green' : 'red'}]}
                        placeholder="Repeat Password"
                        secureTextEntry={true}
                        value={this.state.repeatPassword}
                        onChangeText={(text) => this.onValueChange("repeatPassword", text)}
                    />
                    <TouchableOpacity onPress={this.signUp} style={generalStyle.button}>
                        <Text style={generalStyle.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <Text>{this.errorCodeMessage()}</Text>
                </View>
            </View>
        );
    }
}

export default SignUp;

