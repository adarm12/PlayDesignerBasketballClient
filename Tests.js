import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import axios from 'axios';
import Draggable from 'react-native-draggable';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

class Tests extends Component {
    state = {
        setInitialPosition: true,
        oldPhases: [],
        currentPhase: [
            { x: 0, y: 0, action: 0, draggable: true },
            { x: 0, y: 0, action: 0, draggable: true },
            { x: 0, y: 0, action: 0, draggable: true },
            { x: 0, y: 0, action: 0, draggable: true },
            { x: 0, y: 0, action: 0, draggable: true }
        ],
        selectedCircle: null,
        menuVisible: false,
    };

    componentDidMount() {
        console.log("Initial positions:", this.state.currentPhase);
    }

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

        this.prepareNewPhase();

    };

    prepareNewPhase = () => {
        this.setState(prevState => {
            const newPhases = prevState.currentPhase.map(phase => ({
                ...phase,
                draggable: false,
                action: 0
            }));
            return {
                currentPhase: newPhases,
            };
        });
    }

    setInitialPosition = () => {
        this.setState(prevState => {
            const newPhases = prevState.currentPhase.map(phase => ({
                ...phase,
                draggable: false
            }));
            return {
                currentPhase: newPhases,
                setInitialPosition: false
            };
        });
        console.log(this.state.currentPhase);
    };

    handleCircleClick = (index) => {
        if (!this.state.currentPhase[index].draggable && !this.state.setInitialPosition) {
            this.setState({
                selectedCircle: index,
                menuVisible: !this.state.menuVisible
            });
        }
    };

    handleMenuClick = (action) => {
        if (!this.state.currentPhase[this.state.selectedCircle].draggable && !this.state.setInitialPosition) {
            this.setState(prevState => {
                const newPhase = [...prevState.currentPhase];
                newPhase[prevState.selectedCircle].action = action;
                newPhase[prevState.selectedCircle].draggable = true;
                return { currentPhase: newPhase, menuVisible: false };
            });
        }
    };

    handleDragRelease = (index, event, gestureState) => {
        if (this.state.currentPhase[index].draggable) {
            const newX = this.state.currentPhase[index].x + gestureState.dx;
            const newY = this.state.currentPhase[index].y + gestureState.dy;

            console.log(newX+","+newY);
            this.setState(prevState => {
                const newPhase = [...prevState.currentPhase];
                newPhase[index].x = newX;
                newPhase[index].y = newY;
                return { currentPhase: newPhase };
            });
        }
    };

    render() {
        return (
            <View style={styles.container} height={screenHeight} width={screenWidth}>
                {this.state.currentPhase.map((item, index) => (
                    <Draggable
                        key={index}
                        disabled={!item.draggable}
                        onDragRelease={(e, gestureState) => this.handleDragRelease(index, e, gestureState)}
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

                <TouchableOpacity
                    style={styles.sendPhaseButton}
                    onPress={this.sendPhaseToServer}
                    disabled={this.state.setInitialPosition}
                >
                    <Text style={{ color: 'white' }}>Send Phase</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.setInitialPositionButton}
                    onPress={this.setInitialPosition}
                    disabled={!this.state.setInitialPosition}
                >
                    <Text style={{ color: 'white' }}>Set initial position</Text>
                </TouchableOpacity>

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

                <Text style={styles.debugText}>Phase: {this.state.currentPhase.map((item, index) => (
                    <Text key={index}>{item.x},{item.y} </Text>
                ))}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B9CD3', // Changed background color to make circles more visible
    },

    sendPhaseButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    setInitialPositionButton: {
        position: 'absolute',
        bottom: 50,
        left: '0%',
        marginLeft: 0,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        left: '67%',
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

export default Tests;
