import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import React from 'react'
import {sendApiPostRequest} from "./ApiRequests";
import SearchUser from "./SearchUser";
import ShowRequesters from "./ShowRequesters";

class LoginPage extends React.Component {
    state = {
        apiDomain: "",
        username: null,
        password: null,
        loginSuccess: false,
        userSecret: "",
        errorCode: "",
        sendRequest: false,
        acceptRequest: false,
    }

    componentDidMount() {
        this.setState({apiDomain: this.props.domain})
    }


    login = () => {
        console.log(this.state.username);
        console.log(this.state.password);
        sendApiPostRequest(this.state.apiDomain +'/login', {
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
            case -1:
                errorMessage = "You have successfully connected";
                break;
            case 3:
                errorMessage = "No username entered";
                break;
            case 4:
                errorMessage = "No password entered";
                break;
            case 5:
                errorMessage = "Incorrect username or password";
                break;
        }
        return errorMessage;
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    goBack = () => {
        if (this.state.acceptRequest)
            this.setState({acceptRequest: !this.state.acceptRequest})
        else if (this.state.sendRequest)
            this.setState({sendRequest: !this.state.sendRequest})
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.state.loginSuccess ?
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.props.goBack} style={styles.buttonGoBack}>
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
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
                        {!this.state.acceptRequest && !this.state.sendRequest ?
                            <View style={styles.container}>
                                <TouchableOpacity onPress={() => this.setState({
                                    loginSuccess: !this.state.loginSuccess
                                })} style={styles.button}>
                                    <Text style={styles.buttonText}>Go Back</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({sendRequest: true})}
                                                  style={[styles.button, {width: 200}]}>
                                    <Text style={styles.buttonText}>Send Friend Request</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({acceptRequest: true})}
                                                  style={[styles.button, {width: 200}]}>
                                    <Text style={styles.buttonText}>Accept Friend Request</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.container}>
                                {this.state.sendRequest ?
                                    <SearchUser secretFromLogin={this.state.userSecret}
                                                domain={this.state.apiDomain}
                                                goBack={this.goBack}>
                                    </SearchUser>
                                    :
                                    <View></View>
                                }
                                {this.state.acceptRequest ?
                                    <ShowRequesters secretFromLogin={this.state.userSecret}
                                                    domain={this.state.apiDomain}
                                                    goBack={this.goBack}>
                                    </ShowRequesters>
                                    :
                                    <View></View>
                                }
                            </View>
                        }
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
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
    },
    buttonGoBack: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 60,
        left: -80,
        width: 80,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default LoginPage;