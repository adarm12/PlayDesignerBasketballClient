import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import generalStyle from "./GeneralStyle";
import CreatePhase from "./CreatePhase";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ShowPlay from "./ShowPlay";

class App extends React.Component {

    state = {
        apiDomain: "http://10.0.0.8:8989",
        signUp: false,
        login: false,
        showButtons: false,
        test: false,
    }

    goBack = () => {
        this.setState({showButtons: !this.state.showButtons})
        if (this.state.login)
            this.setState({login: !this.state.login})
        else if (this.state.signUp)
            this.setState({signUp: !this.state.signUp})
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {this.state.test ?
                    <View>

                        <ShowPlay/>
                    </View>
                    :
                    <View style={generalStyle.container}>
                        {!this.state.showButtons ?
                            <View style={generalStyle.container}>
                                <Text style={generalStyle.heading}>Play Designer Basketball
                                    <Icon name={"basketball"} size={25} color={'orange'}/>
                                </Text>
                                <TouchableOpacity style={generalStyle.button}
                                                  onPress={() => this.setState({signUp: true, showButtons: true})}>
                                    <Text style={generalStyle.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={generalStyle.button}
                                                  onPress={() => this.setState({login: true, showButtons: true})}>
                                    <Text style={generalStyle.buttonText}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={generalStyle.container}>
                                {this.state.signUp ?
                                    <SignUp goBack={this.goBack}
                                            domain={this.state.apiDomain}
                                    ></SignUp>
                                    :
                                    <View></View>
                                }
                                {this.state.login ?
                                    <LoginPage goBack={this.goBack}
                                               domain={this.state.apiDomain}
                                    ></LoginPage>
                                    :
                                    <View></View>
                                }
                            </View>
                        }
                        <View></View>
                    </View>
                }
            </View>
        );
    }
}

export default App;
