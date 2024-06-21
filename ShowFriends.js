import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import generalStyle from "./GeneralStyle";

class ShowFriends extends React.Component {
    state = {
        apiDomain: "",
        secretFrom: null,
        responseList: [],
        playsList: [],
        success: false,
        playName: "",
        chooseFriend: false,
        message: "",
    }

    componentDidMount() {
        this.ShowFriends();
    }

    ShowFriends = () => {
        console.log("secret:" + this.props.secretFromLogin);
        this.setState({apiDomain: this.props.domain})
        sendApiPostRequest(this.props.domain + '/get-friends', {
                secretFrom: this.props.secretFromLogin,
            }, (response) => {
                console.log('Response:', response.data.users);
                if (response.data.success) {
                    this.setState({responseList: response.data.users});
                    this.setState({success: true});
                } else {
                    this.setState({message: "There are no friend requests"});
                }
            }
        )
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.chooseFriend ?
                    <View>
                        <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <View style={generalStyle.container}>
                            {this.state.success ?
                                <View style={generalStyle.container}>
                                    <Text style={generalStyle.heading}>Show Friends</Text>
                                    {this.state.responseList.map((users, index) => (
                                        <Text key={index}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    usernameToAccept: users.username,
                                                    secretFrom: this.props.secretFromLogin,
                                                    chooseFriend: true,
                                                    playsList: users.plays
                                                })
                                            }} style={[generalStyle.button, {width: 150}]}>
                                                <Text style={generalStyle.buttonText}>
                                                    {users.username}
                                                </Text>
                                            </TouchableOpacity>
                                        </Text>
                                    ))}
                                </View>
                                :
                                <View style={generalStyle.container}>
                                    <Text> {this.state.message} </Text>
                                </View>
                            }
                        </View>
                    </View>
                    :
                    <View>
                        <TouchableOpacity onPress={() => this.setState({chooseFriend: false})}
                                          style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <View style={generalStyle.container}>
                            <Text style={generalStyle.heading}>Show plays</Text>
                            {this.state.playsList.map((plays, index) => (
                                <Text key={index}>
                                    <TouchableOpacity style={[generalStyle.button, {width: 150}]}>
                                        <Text style={generalStyle.buttonText}>
                                            {plays.name}
                                        </Text>
                                    </TouchableOpacity>
                                </Text>
                            ))}
                        </View>
                    </View>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }
}

export default ShowFriends;