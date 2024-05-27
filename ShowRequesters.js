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
        responseList: null,
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
            console.log('Response:', response.data.users);
            this.setState({responseList: response.data.users});
        })
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.acceptFriend ?
                    <View style={generalStyle.container}>
                        <TouchableOpacity onPress={this.props.goBack}
                                          style={[generalStyle.button]}>
                            <Text style={generalStyle.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                        {this.state.responseList != null ?
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
                            <Text style={generalStyle.heading}> There are no friend requests </Text>
                        }
                        <StatusBar style="auto"/>
                    </View>
                    :
                    <View>
                        <AcceptFriendRequest stateFromShowRequests={this.state}
                                             goBack={this.goBack}>
                        </AcceptFriendRequest>
                    </View>
                }

            </View>

        );
    }

}

export default ShowRequesters;