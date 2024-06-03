import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import axios from 'axios';
import Draggable from 'react-native-draggable';

const { width: screenWidth } = Dimensions.get('window');

class Tests2 extends Component {
    state = {
        oldPhases: [],
        currentPhase: [
            { x: -100, y: 100, action: 0, draggable:false},
            { x: 100, y: 100, action: 0, draggable:false},
            { x: 100, y: 300, action: 0, draggable:false},
            { x: -100, y: 300, action: 0, draggable:false},
            { x: 0, y: 200, action: 0, draggable:false}
        ],
        selectedCircle: null,
        menuVisible: false,
    };

    sendPhaseToServer = () => {
        const playerPhases = this.state.currentPhase.map((phase, index) => ({
            playerNumber: index + 1,
            hasBall: false,
            x: phase.x,
            y: phase.y,
            action: phase.action
        }));

        axios.post("http://10.0.0.8:8989/add-phase", {
            secret: "630d73f0-16b7-4ecf-b44f-4192dfb96d1e",
            playName: "three",
            orderNum: 1,
            playerPhases
        })
            .then(response => {
                console.log('Response:', response.data);
                if (response.data.success) {
                    console.log('OK');
                }
                this.setState({ errorCode: response.data.errorCode });
            })
            .catch(error => {
                console.error('Error sending phase data:', error);
            });
    };




    handleCircleClick = (index) => {
        if (!this.state.currentPhase[index].draggable) {
            this.setState({
                selectedCircle: index,
                menuVisible: !this.state.menuVisible
            });
        }
    };

    handleMenuClick = (action) => {
        if (!this.state.currentPhase[this.state.selectedCircle].draggable) {
            this.setState(prevState => {
                const newPhase = [...prevState.currentPhase];
                newPhase[prevState.selectedCircle].action = action;
                newPhase[prevState.selectedCircle].draggable = true;
                return {currentPhase: newPhase, menuVisible: false};
            });
        }
    };


    handleDragRelease = (index, event, gestureState, bounds) => {
        console.log(this.state.currentPhase[index].draggable)
        if(this.state.currentPhase[index].draggable) {
            const {moveX, moveY} = gestureState;
            this.setState(prevState => {
                const newPhase = prevState.currentPhase.map(item => {
                    if (item.index === index) {
                        return {...item, x: moveX, y: moveY};
                    }
                    return item;
                });

                return {currentPhase: newPhase};
            });
        }


    };



    render() {
        return (
            <View style={{ flex: 1 }}>

                {/*circles*/}
                {this.state.currentPhase.map((item, index) => (
                    <Draggable
                        key={index}
                        x={item.x}
                        y={item.y}
                        disabled={!this.state.currentPhase[index].draggable}
                        onDragRelease={(e, gestureState, bounds) => this.handleDragRelease(index, e, gestureState, bounds)}
                    >
                        <Svg height="100" width="100" onPress={() => this.handleCircleClick(index)}>
                            <Circle
                                cx="50"
                                cy="50"
                                r="25"
                                stroke="black"
                                strokeWidth="2.5"
                                fill="rgba(0, 0, 0, 0.05)"
                            />
                            <SvgText
                                x="50"
                                y="55"
                                fontSize="25"
                                fill="black"
                                textAnchor="middle"
                                fontWeight="bold"
                            >
                                {index + 1}
                            </SvgText>
                        </Svg>
                    </Draggable>
                ))}

                {/*button*/}
                <TouchableOpacity
                    style={styles.sendPhaseButton}
                    onPress={this.sendPhaseToServer}
                >
                    <Text style={{ color: 'white' }}>Send Phase</Text>
                </TouchableOpacity>

                {/*menu*/}
                {this.state.menuVisible && (
                    <View style={styles.menuContainer}>
                        <View style={styles.menu}>
                            <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(1)}>
                                <Text style={styles.menuText}>Cut</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(2)}>
                                <Text style={styles.menuText}>Dribble</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(3)}>
                                <Text style={styles.menuText}>Screen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/*debug stuff*/}
                <Text style={styles.debugText}>Actions: {this.state.currentPhase.map((item, index) => (
                    <Text key={index}>{item.action} </Text>
                ))}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sendPhaseButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        left: screenWidth / 2 - screenWidth / 3,
        width: screenWidth / 3,
        backgroundColor: 'rgba(241, 241, 241, 0.5)',
        padding: 10,
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    menuItem: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginVertical: 5
    },
    menuText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    debugText: {
        position: 'absolute',
        top: 50,
        left: '50%',
        marginLeft: -75,
        fontSize: 16,
        color: 'red'
    }
});

export default Tests2;
