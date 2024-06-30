import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import generalStyle from "./GeneralStyle";

class AcceptFriendRequest extends React.Component {
    state = {
        response: "",
        message: "",
    }

    acceptRequest = () => {
        console.log("secretFrom:" + this.props.stateFromShowRequests.secretFrom);
        console.log("usernameToAccept:" + this.props.stateFromShowRequests.usernameToAccept);
        sendApiPostRequest(this.props.stateFromShowRequests.apiDomain + '/accept-friend', {
            secretFrom: this.props.stateFromShowRequests.secretFrom,
            usernameToAccept: this.props.stateFromShowRequests.usernameToAccept
        }, (response) => {
            console.log('Response:', response.data);
            this.setState({response: response.data});
            if (response.data.success) {
                this.setState({message: "Successfully accepted"});
            }
        })
    }

    render() {
        return (
            <View style={generalStyle.container}>
                <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                    <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={generalStyle.heading}>Accept Request</Text>
                <Text style={generalStyle.heading}>User
                    :{this.props.stateFromShowRequests.usernameToAccept}</Text>
                <TouchableOpacity onPress={this.acceptRequest} style={generalStyle.button}>
                    <Text style={generalStyle.buttonText}>
                        Accept
                    </Text>
                </TouchableOpacity>
                <Text>{this.state.message}</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }

}

export default AcceptFriendRequest;