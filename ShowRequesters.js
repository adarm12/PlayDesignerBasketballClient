import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";

class ShowRequesters extends React.Component {
    state = {
        apiDomain: "",
        responseList: null,
    }

    componentDidMount() {
        this.ShowRequest();
    }

    ShowRequest = () => {
        console.log("secret:" + this.props.secretFromLogin);
        this.setState({apiDomain: this.props.domain})
        sendApiPostRequest(this.state.apiDomain +'/get-friend-requests', {
            secretFrom: this.props.secretFromLogin,
        }, (response) => {
            console.log('Response:', response.data.users);
            this.setState({responseList: response.data.users});
            if (response.data.success) {
                this.setState({requestSuccess: true});
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.goBack}
                                  style={[styles.button, {left: -140}, {width: 80}, {top: 10}]}>
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                {this.state.responseList != null ?
                    <View style={styles.container}>
                        <Text style={styles.heading}>Show Requesters</Text>
                        {this.state.responseList.map((users, index) => (
                            <Text key={index}>
                                <TouchableOpacity style={[styles.button, {width: 150}]}>
                                    <Text style={styles.buttonText}>
                                        {users.username}
                                    </Text>
                                </TouchableOpacity>
                            </Text>
                        ))}
                    </View>
                    :
                    <View>
                        <Text style={styles.heading}> There are no friend requests </Text>
                    </View>
                }
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
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ShowRequesters;