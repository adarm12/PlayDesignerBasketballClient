import React from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import {StatusBar} from "expo-status-bar/build/StatusBar";
import AcceptFriendRequest from "./AcceptFriendRequest";
import generalStyle from "./GeneralStyle";

class ShowRequesters extends React.Component {
    state = {
        apiDomain: "",
        usernameToAccept: "",
        acceptFriend: false,
        secretFrom: null,
        responseList: [],
        success: false,
        message: "",
    }

    componentDidMount() {
        this.ShowRequest();
    }

    goBack = () => {
        this.setState({acceptFriend: !this.state.acceptFriend})
    }

    ShowRequest = () => {
        console.log("secret:" + this.props.secretFromLogin);
        this.setState({apiDomain: this.props.domain})
        sendApiPostRequest(this.props.domain + '/get-friend-requests', {
                secretFrom: this.props.secretFromLogin,
            }, (response) => {
                console.log('Response:', response.data);
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
                {!this.state.acceptFriend ?
                    <View>
                        <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                            <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                        </TouchableOpacity>
                        <View style={generalStyle.container}>
                            {this.state.success?
                                <View style={generalStyle.container}>
                                    <Text style={generalStyle.heading}>Show Requesters</Text>
                                    {this.state.responseList.map((users, index) => (
                                        <Text key={index}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({
                                                    usernameToAccept: users.username,
                                                    secretFrom: this.props.secretFromLogin,
                                                    acceptFriend: true,
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
                        <AcceptFriendRequest stateFromShowRequests={this.state}
                                             goBack={this.goBack}>
                        </AcceptFriendRequest>
                    </View>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }

}

export default ShowRequesters;