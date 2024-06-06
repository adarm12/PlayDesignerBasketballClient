import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Dimensions, PanResponder} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {sendApiPostRequest} from "./ApiRequests";

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

class CreatePhase extends Component {
    circleRadius = 25; // Radius of the circle

    state = {
        phaseNum: 1,
        setInitialPosition: true,
        oldPhases: [],
        currentPhase: [
            {x: 30, y: 200, action: 0, draggable: true},
            {x: 30, y: 260, action: 0, draggable: true},
            {x: 30, y: 320, action: 0, draggable: true},
            {x: 30, y: 380, action: 0, draggable: true},
            {x: 30, y: 440, action: 0, draggable: true}
        ],
        selectedCircle: null,
        menuVisible: false,
        errorCode: "",
    };

    componentDidMount() {
        console.log("Initial positions:", this.state.currentPhase);
    }

    panResponders = this.state.currentPhase.map((circle, index) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => this.state.currentPhase[index].draggable,
            onPanResponderMove: (event, gestureState) => {
                if (this.state.currentPhase[index].draggable) {
                    const newPhase = [...this.state.currentPhase];
                    newPhase[index] = {
                        ...newPhase[index],
                        x: gestureState.moveX,
                        y: gestureState.moveY,
                    };
                    this.setState({currentPhase: newPhase});
                }
            },
        })
    );

    createPhase = () => {
        const playerPhases = this.state.currentPhase.map((phase, index) => ({
            playerNumber: index + 1,
            hasBall: false,
            x: phase.x,
            y: phase.y,
            action: phase.action
        }));
        sendApiPostRequest(this.props.domain + '/add-phase', {
            secret: this.props.userSecret,
            playName: this.state.playName,
            orderNum: 1,
            playerPhases
        }, (response) => {
            console.log('Response:', response.data);
            if (response.data.success) {
                console.log('OK');
            }
            this.setState({errorCode: response.data.errorCode});
        })
        this.prepareNewPhase();
    }

    prepareNewPhase = () => {
        this.setState(prevState => {
            const newPhases = prevState.currentPhase.map(phase => ({
                ...phase,
                draggable: false,
                action: 0,
                phaseNum: this.state.phaseNum + 1
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
                return {currentPhase: newPhase, menuVisible: false};
            });
        }
    };


    render() {
        return (
            <View style={styles.container} height={screenHeight} width={screenWidth}>
                {this.state.currentPhase.map((item, index) => (
                    <GestureHandlerRootView key={index} style={styles.gestureHandler}>
                        <TouchableOpacity onPress={() => this.handleCircleClick(index)}>
                            <View
                                {...this.panResponders[index].panHandlers}
                                style={[
                                    styles.circle,
                                    {
                                        left: item.x - this.circleRadius,
                                        top: item.y - this.circleRadius,
                                    },
                                ]}
                            >
                                <Svg height={60} width={60}>
                                    <Circle
                                        cx="30"
                                        cy="30"
                                        r={25}
                                        stroke="black"
                                        strokeWidth="2.5"
                                        fill="rgba(0, 0, 0, 0.05)"
                                    />
                                    <SvgText
                                        x="30"
                                        y="35"
                                        fontSize="25"
                                        fill="black"
                                        textAnchor="middle"
                                        fontWeight="bold"
                                    >
                                        {index + 1}
                                    </SvgText>
                                </Svg>

                            </View>
                        </TouchableOpacity>
                    </GestureHandlerRootView>
                ))}

                <TouchableOpacity
                    style={styles.sendPhaseButton}
                    onPress={this.createPhase}
                    disabled={this.state.setInitialPosition}
                >
                    <Text style={{color: 'white'}}>Send Phase</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.setInitialPositionButton}
                    onPress={this.setInitialPosition}
                    disabled={!this.state.setInitialPosition}
                >
                    <Text style={{color: 'white'}}>Set initial position</Text>
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
    gestureHandler: {
        position: 'absolute',
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

export default CreatePhase;