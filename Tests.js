import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import { Circle, Triangle } from 'react-native-shape';
import axios from "axios";

class Tests extends React.Component {
    state = {

        oldPhases: [],
        currentPhase: [
            {
                x: 50,
                y: 100
            },
            {
                x: 50,
                y: 100
            },
            {
                x: 50,
                y: 100
            },
            {
                x: 50,
                y: 100
            },
            {
                x: 50,
                y: 100
            }
        ]
        // phases: [{
        //     x: 50,
        //     y: 100
        // },{
        //     x: 200,
        //     y: 200
        // }]
    }

    render() {
        return (
            <View style={{
                position: "absolute"
            }}>
                {
                    this.state.currentPhase.map(item => {
                        return (
                            <View style={{
                                left: item.x,
                                top: item.y
                            }} onResponderMove ={(event) => {
                                console.log(event)
                            }}>
                                <Circle />
                            </View>
                        )
                    })
                }
                <TouchableOpacity onPress={() => {
                    // axios.get(, , {
                    //     plays: JSON.stringify(this.state.phases)
                    // })
                }} style={{
                    top: 300,
                    left: 300
                }} >
                    <Text>PRESS</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default Tests;