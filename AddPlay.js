import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import generalStyle from "./GeneralStyle";

class AddPlay extends React.Component {
    state = {
        apiDomain: "",
        playName: null,
        addPlaySuccess: "",
        errorCode: "",
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    addPlay = () => {
        console.log("secret" + this.props.secretFromLogin);
        sendApiPostRequest(this.props.domain + '/add-play', {
            secret: this.props.secretFromLogin,
            playName: this.state.playName,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success)
                this.setState({addPlaySuccess: true});
            this.setState({errorCode: response.data.errorCode})
        })
    }

    errorCodeMessage = () => {
        let errorMessage = "";
        switch (this.state.errorCode) {
            case -1:
                errorMessage = "Successfully added";
                break;
            case 16:
                errorMessage = "Play name is taken";
                break;
            case 18:
                errorMessage = "No play name";
                break;
        }
        return errorMessage;
    }

    render() {
        return (
            <View style={generalStyle.container}>
                <TouchableOpacity onPress={this.props.goBack}
                                  style={[generalStyle.button]}>
                    <Text style={generalStyle.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <Text style={generalStyle.heading}>Add New Play</Text>
                <TextInput
                    style={generalStyle.input}
                    placeholder="Play Name"
                    secureTextEntry={true}
                    value={this.state.username}
                    onChangeText={(text) => this.onValueChange("playName", text)}
                />
                <TouchableOpacity onPress={this.addPlay} style={generalStyle.button}>
                    <Text style={generalStyle.buttonText}>Submit</Text>
                </TouchableOpacity>
                <Text>{this.errorCodeMessage()}</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

export default AddPlay;