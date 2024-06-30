import {View, Text, TextInput, TouchableOpacity} from "react-native";
import React from 'react'
import {sendApiPostRequest} from "./ApiRequests";
import SearchUser from "./SearchUser";
import ShowRequesters from "./ShowRequesters";
import generalStyle from "./GeneralStyle";
import CreatePlay from "./CreatePlay";
import ShowFriends from "./ShowFriends";

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
        createPlay: false,
        showFriends: false,
    }

    componentDidMount() {
        this.setState({apiDomain: this.props.domain})
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
        else if (this.state.createPlay)
            this.setState({createPlay: !this.state.createPlay})
        else if (this.state.showFriends)
            this.setState({showFriends: !this.state.showFriends})
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.loginSuccess ?
                    <View style={generalStyle.container}>
                        <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <Text style={generalStyle.heading}>Login</Text>
                        <TextInput
                            style={generalStyle.input}
                            placeholder="username"
                            secureTextEntry={true}
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
                        <TouchableOpacity onPress={this.login} style={generalStyle.button}>
                            <Text style={generalStyle.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <Text>{this.errorCodeMessage()}</Text>
                    </View>
                    :
                    <View style={generalStyle.container}>
                        {!this.state.acceptRequest && !this.state.sendRequest && !this.state.createPlay && !this.state.showFriends ?
                            <View style={generalStyle.container}>
                                <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                                    <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                                </TouchableOpacity>
                                <View style={generalStyle.container}>
                                    <TouchableOpacity onPress={() => this.setState({sendRequest: true})}
                                                      style={[generalStyle.button, {width: 200}]}>
                                        <Text style={generalStyle.buttonText}>Send Friend Request</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({acceptRequest: true})}
                                                      style={[generalStyle.button, {width: 200}]}>
                                        <Text style={generalStyle.buttonText}>Accept Friend Request</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({createPlay: true})}
                                                      style={[generalStyle.button, {width: 200}]}>
                                        <Text style={generalStyle.buttonText}>Create New Play</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({showFriends: true})}
                                                      style={[generalStyle.button, {width: 200}]}>
                                        <Text style={generalStyle.buttonText}>Show Friends</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :
                            <View style={generalStyle.container}>
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
                                {this.state.createPlay ?
                                    <CreatePlay secretFromLogin={this.state.userSecret}
                                                domain={this.state.apiDomain}
                                                goBack={this.goBack}>
                                    </CreatePlay>
                                    :
                                    <View></View>
                                }
                                {this.state.showFriends ?
                                    <ShowFriends secretFromLogin={this.state.userSecret}
                                                 domain={this.state.apiDomain}
                                                 goBack={this.goBack}>
                                    </ShowFriends>
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

export default LoginPage;