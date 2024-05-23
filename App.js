import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import Tests from "./Tests";

class App extends React.Component {

    state = {
        apiDomain: "",
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
            <View style={styles.container}>
                {this.state.test ?
                    <View>
                        <Tests/>
                    </View>
                    :
                    <View style={styles.container}>
                        {!this.state.showButtons ?
                            <View style={styles.container}>
                                <Text style={styles.heading}>Play Designer Basketball</Text>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => this.setState({signUp: true, showButtons: true})}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => this.setState({login: true, showButtons: true})}>
                                    <Text style={styles.buttonText}>Log In</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#067b8f"
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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

export default App;
