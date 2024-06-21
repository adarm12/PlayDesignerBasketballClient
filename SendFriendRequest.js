import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import generalStyle from "./GeneralStyle";

class SendFriendRequest extends React.Component {
    state = {
        response: "",
        requestSuccess: false,
        errorCode: "",
    }


    sendRequest = () => {
        console.log("secret:" + this.props.stateFromSearch.secretFrom);
        console.log("usernameTo:" + this.props.stateFromSearch.usernameTo);
        sendApiPostRequest(this.props.stateFromSearch.apiDomain + '/request-friend', {
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
                errorMessage = "Successfully sent";
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
            <View style={generalStyle.container}>
                <View>
                    <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                        <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                    </TouchableOpacity>
                    <View style={generalStyle.container}>
                        <Text style={generalStyle.heading}>Friend Request</Text>
                        <Text style={generalStyle.text}>User: {this.props.stateFromSearch.usernameTo}</Text>
                        <TouchableOpacity onPress={this.sendRequest} style={generalStyle.button}>
                            <Text style={generalStyle.buttonText}>
                                Request
                            </Text>
                        </TouchableOpacity>
                        <Text style={generalStyle.text}> {this.errorCodeMessage()}</Text>
                    </View>
                </View>
                <StatusBar style="auto"/>
            </View>
        );
    }

}

export default SendFriendRequest;