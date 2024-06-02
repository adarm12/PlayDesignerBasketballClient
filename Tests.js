import React, { Component } from 'react';
import { Animated, PanResponder, View, TouchableOpacity, Text } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import axios from 'axios';
import {sendApiPostRawBody, sendApiPostRequest} from "./ApiRequests";

class Tests extends Component {
    state = {
        oldPhases: [],
        currentPhase: [
            { x: -100, y: 100 },
            { x: 100, y: 100 },
            { x: 100, y: 300 },
            { x: -100, y: 300 },
            { x: 0, y: 200 }
        ]
    };

    // Things related to draggable circles
    position = this.state.currentPhase.map((item) => new Animated.ValueXY({ x: item.x, y: item.y }));

    createPanResponder = (position, index) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: this.onPanResponderMove(position),
            onPanResponderRelease: this.onPanResponderRelease(position, index),
            onPanResponderGrant: this.onPanResponderGrant(position)
        });
    };

    onPanResponderMove = (position) => Animated.event(
        [
            null,
            { dx: position.x, dy: position.y }
        ],
        { useNativeDriver: false }
    );

    onPanResponderRelease = (position, index) => () => {
        position.flattenOffset();
        this.setState(prevState => {
            const newPhase = [...prevState.currentPhase];
            newPhase[index] = {
                x: position.x._value,
                y: position.y._value
            };
            return { currentPhase: newPhase };
        });
    };

    onPanResponderGrant = (position) => () => {
        position.setOffset({
            x: position.x._value,
            y: position.y._value
        });
        position.setValue({ x: 0, y: 0 });
    };

    panResponders = this.position.map((position, index) => this.createPanResponder(position, index));
    //end of draggable stuff



    // Method to send the current phase data to the server
    sendPhaseToServer = () => {
        const playerPhases = this.state.currentPhase.map((phase, index) => ({
            playerNumber: index + 1,
            phase: null,
            hasBall: false,
            x: phase.x,
            y: phase.y,
            action: 0
        }));

        sendApiPostRawBody("http://10.0.0.8:8989" + '/add-phase', {
            secret: "630d73f0-16b7-4ecf-b44f-4192dfb96d1e",
            playName: "three",
            orderNum: 1,
            playerPhases
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success) {
                console.log('OK');
            }
            this.setState({errorCode: response.data.errorCode})
        })
    };


    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.currentPhase.map((item, index) => (
                    <Animated.View
                        key={index}
                        style={{
                            position: 'absolute',
                            transform: this.position[index].getTranslateTransform()
                        }}
                        {...this.panResponders[index].panHandlers}
                    >
                        <Svg height="100" width="100">
                            <Circle
                                cx="50"
                                cy="50"
                                r="25"
                                stroke="black"
                                strokeWidth="2.5"
                                fill="rgba(0, 0, 0, 0.05)" // 10% transparency
                            />
                            <SvgText
                                x="49.5"
                                y="58"
                                fontSize="25"
                                fill="black"
                                textAnchor="middle"
                                fontWeight="bold" // Bold text
                            >
                                {index + 1}
                            </SvgText>
                        </Svg>
                    </Animated.View>
                ))}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        bottom: 50,
                        left: '50%',
                        marginLeft: -50,
                        backgroundColor: 'blue',
                        padding: 10,
                        borderRadius: 5
                    }}
                    onPress={this.sendPhaseToServer}
                >
                    <Text style={{ color: 'white' }}>Send Phase</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Tests;
