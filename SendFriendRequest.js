import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";

class SendFriendRequest extends React.Component {
    state = {
        response: "",
        requestSuccess: false,
        errorCode: "",
    }

    request = () => {
        console.log("secret:" + this.props.stateFromSearch.secretFrom);
        console.log("usernameTo:" + this.props.stateFromSearch.usernameTo);
        sendApiPostRequest('/request-friend', {
            secretFrom: this.props.stateFromSearch.secretFrom,
            usernameTo: this.props.stateFromSearch.usernameTo,
        }, (response) => {
            console.log('Response:', response.data);
            this.setState({response: response.data});
            if (response.data.success) {
                this.setState({requestSuccess: true});
            }
            this.setState({errorCode: response.data.errorCode})
        })
    }

    errorCodeMessage = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case -1:
                errorMessage = "Your friend request has been send";
                break;
            case 11:
                errorMessage = "Already sent request";
                break;
            case 12:
                errorMessage = "The request exists";
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
                <Text style={styles.heading}>Friend Request</Text>
                <Text style={styles.text}>user: {this.props.stateFromSearch.usernameTo}</Text>
                <TouchableOpacity onPress={this.request} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Request
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}> {this.errorCodeMessage()}</Text>
                <StatusBar style="auto"/>
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
        padding: 5,
        marginBottom: 10,
        width: 200,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 5,
        width: 80,
    },
    text: {
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
        width: "auto",
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SendFriendRequest;