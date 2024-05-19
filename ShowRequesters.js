import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";

class ShowRequesters extends React.Component {
    state = {
        responseList: null,
    }


    ShowRequest = () => {
        console.log("secret:" + this.props.secretFromLogin);
        sendApiPostRequest('/get-friend-requests', {
            secretFrom: this.props.secretFromLogin,
        }, (response) => {
            console.log('Response:', response.data.users);
            this.setState({responseList: response.data.users});
            if (response.data.success) {
                this.setState({requestSuccess: true});
            }
        })
    }

    componentDidMount() {
        this.ShowRequest();
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.goBack} style={styles.button}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Show Requesters</Text>
                {this.state.responseList.map((users,index) => (
                    <Text key={index}>
                        <TouchableOpacity style={[styles.button, {width: 150}]}>
                            <Text style={styles.buttonText}>
                                {users.username}
                            </Text>
                        </TouchableOpacity>
                    </Text>
                ))}
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
        marginBottom: 5,
    },
    text: {
        fontSize: 18,
        padding: 10,
        borderRadius: 5,
        width: 180,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ShowRequesters;