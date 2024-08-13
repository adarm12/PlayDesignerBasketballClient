import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { sendApiPostRequest } from "./ApiRequests";
import generalStyle from "./GeneralStyle";
import CreatePhase from "./CreatePhase";

class CreatePlay extends React.Component {
    state = {
        apiDomain: "",
        playName: null,
        defense: 0,
        userSecret: "",
        createPlaySuccess: false,
        errorCode: "",
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    onDefenseSelect = (defenseType) => {
        let defenseValue = 0;
        if (defenseType === "Man to Man") {
            defenseValue = 1;
        } else if (defenseType === "Zone") {
            defenseValue = 2;
        }
        this.setState({ defense: defenseValue });
    }

    createPlay = () => {
        console.log("secret" + this.props.secretFromLogin);
        this.setState({ apiDomain: this.props.domain })
        this.setState({ userSecret: this.props.secretFromLogin })
        sendApiPostRequest(this.props.domain + '/add-play', {
            secret: this.props.secretFromLogin,
            playName: this.state.playName,
            defense: this.state.defense,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success)
                this.setState({ createPlaySuccess: true });
            this.setState({ errorCode: response.data.errorCode })
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
            case 21:
                errorMessage = "No defense selected";
                break;
        }
        return errorMessage;
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.createPlaySuccess ?
                    <View style={generalStyle.container}>
                        <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, { fontSize: 20 }]}>{"<"}</Text>
                        </TouchableOpacity>
                        <Text style={generalStyle.heading}>Create New Play</Text>
                        <TextInput
                            style={generalStyle.input}
                            placeholder="Play Name"
                            value={this.state.username}
                            onChangeText={(text) => this.onValueChange("playName", text)}
                        />

                        {/* Title for defense selection */}
                        <Text style={generalStyle.heading}>Select Defense</Text>

                        {/* Man to Man and Zone buttons on the same line */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity onPress={() => this.onDefenseSelect("Man to Man")} style={generalStyle.button}>
                                <Text style={generalStyle.buttonText}>Man to Man</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.onDefenseSelect("Zone")} style={generalStyle.button}>
                                <Text style={generalStyle.buttonText}>Zone</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={this.createPlay} style={generalStyle.button}>
                            <Text style={generalStyle.buttonText}>Submit</Text>
                        </TouchableOpacity>
                        <Text>{this.errorCodeMessage()}</Text>
                    </View>
                    :
                    <View>
                        <CreatePhase domain={this.state.apiDomain}
                                     playName={this.state.playName}
                                     userSecret={this.state.userSecret}
                                     defense = {this.state.defense}
                                     goBack={() => this.setState({ createPlaySuccess: false })}>
                        </CreatePhase>
                    </View>
                }
                <StatusBar style="auto" />
            </View>
        );
    }

}

export default CreatePlay;
