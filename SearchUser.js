import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";
import SendFriendRequest from "./SendFriendRequest"

class SearchUser extends React.Component {
    state = {
        apiDomain: "",
        secretFrom: null,
        partOfUsername: null,
        searchSuccess: false,
        usernameTo: "",
        chooseFriend: false,
        responseList: null,
        message: "",
    }

    search = () => {
        console.log("secret" + this.props.secretFromLogin);
        console.log(this.state.partOfUsername);
        sendApiPostRequest(this.state.apiDomain +'/search-user', {
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
            }
        })
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

    render() {
        return (
            <View style={styles.container}>
                {!this.state.chooseFriend ?
                    <View style={styles.container}>
                        {!this.state.searchSuccess ?
                            <View style={styles.container}>
                                <TouchableOpacity onPress={this.props.goBack}
                                                  style={[styles.button, {left: -140}, {width: 80}, {top: -250}]}>
                                    <Text style={styles.buttonText}>Go Back</Text>
                                </TouchableOpacity>
                                <Text style={styles.heading}>Search User</Text>
                                <TextInput value={this.state.partOfUsername}
                                           placeholder="Enter username to search"
                                           onChangeText={(text) => this.onValueChange("partOfUsername", text)}
                                           style={styles.input}></TextInput>
                                <TouchableOpacity onPress={this.search} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        Search
                                    </Text>
                                </TouchableOpacity>
                                <Text>
                                    {this.state.message}
                                </Text>
                            </View>
                            :
                            <View style={styles.container}>
                                <TouchableOpacity
                                    onPress={() => this.setState({searchSuccess: !this.state.searchSuccess})}
                                    style={[styles.button, {left: -110}, {top: 60}]}>
                                    < Text style={styles.buttonText}>Go Back</Text>
                                </TouchableOpacity>
                                {this.state.responseList != null ?
                                    <View style={styles.container}>
                                        <Text style={styles.heading}>Results</Text>
                                        {this.state.responseList.map((users) => (
                                            <View key={users.id}>
                                                <TouchableOpacity onPress={() => {
                                                    this.setState({
                                                        usernameTo: users.username,
                                                        chooseFriend: true,
                                                        secretFrom: this.props.secretFromLogin,
                                                    })
                                                }} style={[styles.button, {width: 150}]}>
                                                    <Text style={styles.buttonText}>
                                                        {users.username}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.heading}> No results</Text>
                                    </View>
                                }
                            </View>
                        }
                    </View>
                    :
                    <SendFriendRequest stateFromSearch={this.state}
                                       domain={this.state.apiDomain}
                                       goBack={this.goBack}>
                    </SendFriendRequest>
                }
                <StatusBar style="auto"/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: 200,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SearchUser;