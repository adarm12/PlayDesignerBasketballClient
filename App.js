import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from "./SignUp";
import LoginPage from "./LoginPage";

const Stack = createStackNavigator();

class App extends React.Component {

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Play Designer Basketball</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
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


function AppWrapper() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={App}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Login" component={LoginPage}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppWrapper;
