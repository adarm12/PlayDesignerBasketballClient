import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";

class App extends React.Component {

    state = {
        signUp: false,
        login: false,
        showButtons: false,
    }

    render() {
        return (
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
                            <SignUp></SignUp>
                            :
                            <View></View>
                        }
                        {this.state.login ?
                            <LoginPage></LoginPage>
                            :
                            <View></View>
                        }
                    </View>
                }
                <View></View>
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
        width: '80%',
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});

export default App;
