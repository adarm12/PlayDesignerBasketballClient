import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import SendFriendRequest from "./SendFriendRequest"
import generalStyle from "./GeneralStyle";

class SearchUser extends React.Component {
    state = {
        apiDomain: "",
        secretFrom: null,
        partOfUsername: null,
        searchSuccess: false,
        usernameTo: "",
        chooseFriend: false,
        responseList: [],
        message: "",
    }

    componentDidMount() {
        this.setState({apiDomain: this.props.domain})
    }

    goBack = () => {
        this.setState({chooseFriend: !this.state.chooseFriend})
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }

    search = () => {
        console.log("secret" + this.props.secretFromLogin);
        console.log(this.state.partOfUsername);
        sendApiPostRequest(this.state.apiDomain + '/search-user', {
            secretFrom: this.props.secretFromLogin,
            partOfUsername: this.state.partOfUsername,
        }, (response) => {
            console.log('Response:', response.data.users);
            this.setState({responseList: response.data.users});
            if (response.data.success) {
                this.setState({searchSuccess: true});
            } else {
                if (response.data.errorCode === 14)
                    this.setState({message: "No search"});
                if (response.data.errorCode === 19)
                    this.setState({message: "No search results"});
            }
        })
    }

    render() {
        return (
            <View style={generalStyle.container}>
                {!this.state.chooseFriend ?
                    <View style={generalStyle.container}>
                        {!this.state.searchSuccess ?
                            <View style={generalStyle.container}>
                                <TouchableOpacity onPress={this.props.goBack} style={generalStyle.goBackButton}>
                                    <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                                </TouchableOpacity>
                                <View style={generalStyle.container}>
                                    <Text style={generalStyle.heading}>Search User</Text>
                                    <TextInput value={this.state.partOfUsername}
                                               placeholder="Enter username to search"
                                               onChangeText={(text) => this.onValueChange("partOfUsername", text)}
                                               style={generalStyle.input}></TextInput>
                                    <TouchableOpacity onPress={this.search} style={generalStyle.button}>
                                        <Text style={generalStyle.buttonText}>
                                            Search
                                        </Text>
                                    </TouchableOpacity>
                                    <Text>
                                        {this.state.message}
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={generalStyle.container}>
                                <TouchableOpacity
                                    onPress={() => this.setState({searchSuccess: !this.state.searchSuccess})}
                                    style={generalStyle.goBackButton}>
                                    <Text style={[generalStyle.buttonText, {fontSize: 20}]}>{"<"}</Text>
                                </TouchableOpacity>
                                <View style={generalStyle.container}>
                                    {this.state.responseList != null ?
                                        <View style={generalStyle.container}>
                                            <Text style={generalStyle.heading}>Results</Text>
                                            {this.state.responseList.map((users) => (
                                                <View key={users.id}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.setState({
                                                            usernameTo: users.username,
                                                            chooseFriend: true,
                                                            secretFrom: this.props.secretFromLogin,
                                                        })
                                                    }} style={[generalStyle.button, {width: 150}]}>
                                                        <Text style={generalStyle.buttonText}>
                                                            {users.username}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                        :
                                        <Text style={generalStyle.heading}> {this.state.message}</Text>
                                    }
                                </View>
                            </View>
                        }
                    </View>
                    :
                    <SendFriendRequest stateFromSearch={this.state}
                                       goBack={this.goBack}>
                    </SendFriendRequest>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }
}

export default SearchUser;