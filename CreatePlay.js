import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import generalStyle from "./GeneralStyle";
import CreatePhase from "./CreatePhase";

class CreatePlay extends React.Component {
    state = {
        apiDomain: "",
        playName: null,
        userSecret: "",
        createPlaySuccess: false,
        errorCode: "",
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    createPlay = () => {
        console.log("secret" + this.props.secretFromLogin);
        this.setState({apiDomain: this.props.domain})
        this.setState({userSecret: this.props.secretFromLogin})
        sendApiPostRequest(this.props.domain + '/add-play', {
            secret: this.props.secretFromLogin,
            playName: this.state.playName,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success)
                this.setState({createPlaySuccess: true});
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
                {!this.state.createPlaySuccess ?
                    <View>
                        <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <View style={generalStyle.container}>
                            <Text style={generalStyle.heading}>Create New Play</Text>
                            <TextInput
                                style={generalStyle.input}
                                placeholder="Play Name"
                                secureTextEntry={true}
                                value={this.state.username}
                                onChangeText={(text) => this.onValueChange("playName", text)}
                            />
                            <TouchableOpacity onPress={this.createPlay} style={generalStyle.button}>
                                <Text style={generalStyle.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <Text>{this.errorCodeMessage()}</Text>
                        </View>
                    </View>
                    :
                    <View>
                        <CreatePhase domain={this.state.apiDomain}
                                     playName={this.state.playName}
                                     userSecret={this.state.userSecret}
                                     goBack={() => this.setState({createPlaySuccess: false})}>
                        </CreatePhase>
                    </View>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }
}

export default CreatePlay;