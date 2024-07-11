import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import generalStyle from "./GeneralStyle";
import ShowPlay from "./ShowPlay";

class ShowUserPlays extends React.Component {
    state = {
        apiDomain: "",
        secretFrom: null,
        success: false,
        playName: "",
        playsList: [],
        choosePlay: false,
        chosenPlay: [],
        message: "",
    }

    componentDidMount() {
        this.getUserPlays();
    }

    getUserPlays = () => {
        console.log("secret:" + this.props.secretFromLogin);
        this.setState({apiDomain: this.props.domain})
        sendApiPostRequest(this.props.domain + '/get-user-plays', {
                secret: this.props.secretFromLogin,
            }, (response) => {
                console.log('Response:', response.data.plays);
                if (response.data.success) {
                    this.setState({playsList: response.data.plays});
                    this.setState({success: true});
                } else {
                    this.setState({message: "There are no plays"});
                }
            }
        )
    }


    goBack = () => {
        this.setState({choosePlay: !this.state.choosePlay})
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.choosePlay ?
                    <View style={generalStyle.container}>
                        <TouchableOpacity onPress={this.props.goBack}
                                          style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <View style={generalStyle.container}>
                            {this.state.success ?
                                <View style={generalStyle.container}>
                                    <Text style={generalStyle.heading}>My Plays List </Text>
                                    {this.state.playsList.map((plays, index) => (
                                        <Text key={index}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    choosePlay: true,
                                                    chosenPlay: plays,
                                                })
                                            }} style={[generalStyle.button, {width: 150}]}>
                                                <Text style={generalStyle.buttonText}>
                                                    {plays.name}
                                                </Text>
                                            </TouchableOpacity>
                                        </Text>
                                    ))}
                                </View>
                                :
                                <Text style={generalStyle.heading}> {this.state.message}</Text>
                            }
                        </View>
                    </View>
                    :
                    <ShowPlay playToShow={this.state.chosenPlay}
                              goBack={this.goBack}>
                    </ShowPlay>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }
}

export default ShowUserPlays;