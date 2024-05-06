import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {sendApiPostRequest} from "./ApiRequests";


class searchUser extends React.Component {
    state = {
        apiDomain: "",
        secretFrom: "",
        partOfUsername: "",
        searchSuccess: false,
        response: "",
    }

    search = () => {
        console.log(this.state.secretFrom);
        console.log(this.state.partOfUsername);
        sendApiPostRequest(this.state.apiDomain + 'search-user', {
            secretFrom: this.state.userSecret,
            partOfUsername: this.state.partOfUsername,
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.users.length > 0) {
                this.setState({searchSuccess: true});
                this.setState({response: response.data.users});
            }
        })
    }

    onValueChange = (key, text) => {
        this.setState({
            [key]: text
        });
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Search User</Text>
                <Text>username: </Text>
                <TextInput value={this.state.partOfUsername}
                           onChangeText={(text) => this.onValueChange("partOfUsername", text)}
                           style={styles.input}></TextInput>
                <TouchableOpacity onPress={this.search} style={styles.button}>
                    <Text>
                        Search
                    </Text>
                </TouchableOpacity>
                <View style={styles.container}>
                    {this.state.searchSuccess ?
                        <View> Results :
                            {this.state.response.map((result) => {
                                return (
                                    <View>
                                        <Text style={styles.item}> {result.username} </Text>
                                    </View>
                                )
                            })
                            }
                        </View>
                        :
                        <View></View>
                    }
                </View>
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
        padding: 5,
        marginBottom: 10,
        width: 200,
    },
    button: {
        backgroundColor: 'yellow',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default searchUser;