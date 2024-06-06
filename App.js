import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import Tests from "./Tests";
import generalStyle from "./GeneralStyle";

class App extends React.Component {

    state = {
        apiDomain: "",
        signUp: false,
        login: false,
        showButtons: false,
        test: true,
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
                        <Tests/>
                    </View>
                    :
                    <View style={generalStyle.container}>
                        {!this.state.showButtons ?
                            <View style={generalStyle.container}>
                                <Text style={generalStyle.heading}>Play Designer Basketball</Text>
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
