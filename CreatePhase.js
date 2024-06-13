import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions, PanResponder} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import axios from "axios";
import {DIMENSIONS} from "./Constants";
import {drawArrowsBetweenTwoPhases} from "./DrawArrows";
import GeneralStyle from "./GeneralStyle";

import { freezeCircles, releaseCircles, releaseCirclesWithAction, deleteOtherBalls, prepareNewPhase } from './PhaseFunctions';


class CreatePhase extends Component {
    circleRadius = 25; // Radius of the circle

    state = {
        phaseNumber: 1,
        setInitialPosition: true,
        waitingForPass: false,
        ballBeenPassed: false,
        ballBeenShot: false,
        errorCode: "",
        arrows: [],

        oldPhases: [],
        currentPhase: [
            {x: 30, y: 200, action: 0, draggable: false, ball: false},
            {x: 30, y: 260, action: 0, draggable: false, ball: false},
            {x: 30, y: 320, action: 0, draggable: false, ball: false},
            {x: 30, y: 380, action: 0, draggable: false, ball: false},
            {x: 30, y: 440, action: 0, draggable: false, ball: false}
        ],
        selectedCircle: null,
        menuVisible: false,
        setBallMenuVisible: false
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
                    this.setState({
                        arrows:[]
                    })
                }
            },
            onPanResponderRelease: (event, gestureState) => {

                this.drawArrows()
            }
        })
    );

    createPhase = () => {
        const playerPhases = this.state.currentPhase.map((phase, index) => ({
            playerNumber: index + 1,
            hasBall: phase.ball,
            x: phase.x,
            y: phase.y,
            action: phase.action
        }));

        axios.post(this.props.domain + '/add-phase', {
            secret: this.props.userSecret,
            playName: this.props.playName,
            orderNum: 1,
            playerPhases
        })
            .then(response => {
                console.log('Response:', response.data);
                if (response.data.success) {
                    console.log('OK');
                }
                this.setState({errorCode: response.data.errorCode});
            })
            .catch(error => {
                console.error('Error sending phase data:', error);
            });

        this.setState(prevState => ({
            oldPhases: [...prevState.oldPhases, prevState.currentPhase],
        }));

        if (!this.state.ballBeenShot) {
            const newPhaseData = prepareNewPhase(this.state.currentPhase);
            this.setState(newPhaseData);
        } else {
            // GoBack
            console.log(this.state.oldPhases);
        }
    };

    handleCircleClick = (index) => {
        if (!this.state.currentPhase[index].draggable && !this.state.setInitialPosition && !this.state.waitingForPass) {
            this.setState({
                selectedCircle: index,
                menuVisible: !this.state.menuVisible
            });
        } else if (this.state.setInitialPosition) {
            this.initialPositionCircleClick(index)
        } else if (this.state.waitingForPass) {
            const newPhases = deleteOtherBalls(this.state.currentPhase);
            newPhases[index].ball = true;
            this.setState({
                currentPhase: newPhases,
                setBallMenuVisible: false,
                waitingForPass: false,
                ballBeenPassed: true
            });
            const releasedPhases = releaseCirclesWithAction(newPhases);
            this.setState({ currentPhase: releasedPhases });

            this.drawArrows()
        }
    };

    drawArrows = () => {
        this.setState(
            prevState => {
                const newArrows = !prevState.setInitialPosition
                    ? drawArrowsBetweenTwoPhases(
                        prevState.oldPhases[prevState.oldPhases.length - 1],
                        prevState.currentPhase
                    )
                    : [];
                console.log(newArrows)
                return { arrows: newArrows };
            },

        );
    }

    initialPositionCircleClick = (index) => {
        this.setState({
            setBallMenuVisible: !this.state.setBallMenuVisible,
            selectedCircle: index,
        });
    }

    handleMenuClick = (action) => {
        if (!this.state.currentPhase[this.state.selectedCircle].draggable && !this.state.setInitialPosition) {
            this.setState(prevState => {
                const newPhase = [...prevState.currentPhase];
                newPhase[prevState.selectedCircle].action = action;
                newPhase[prevState.selectedCircle].draggable = true;
                return {currentPhase: newPhase, menuVisible: false};
            });
        }
        if (action === 5) {
            this.setState(prevState => {
                const newPhase = [...prevState.currentPhase];
                newPhase[prevState.selectedCircle].draggable = false;
                return {currentPhase: newPhase, ballBeenShot: true};
            });
        }
    };

    handlePass = () => {
        const frozenPhases = freezeCircles(this.state.currentPhase);
        this.setState({ currentPhase: frozenPhases });
        if (!this.state.ballBeenPassed) {
            this.setState({
                waitingForPass: true,
                menuVisible: false
            });
        }
    }

    handleBallMenuClick = () => {
        const releasedPhases = releaseCircles(this.state.currentPhase);
        this.setState({ currentPhase: releasedPhases });
        this.setState(prevState => {
            const newPhase = [...prevState.currentPhase];
            newPhase[prevState.selectedCircle].ball = true;
            return {currentPhase: newPhase, setBallMenuVisible: false};
        });
    }

    render() {
        return (
            <View style={[GeneralStyle.phaseContainer]}>
                <View style={GeneralStyle.phaseContainer} height={DIMENSIONS.HEIGHT} width={DIMENSIONS.WIDTH}>
                    {this.state.currentPhase.map((item, index) => (
                        <GestureHandlerRootView key={index} style={GeneralStyle.gestureHandler}>
                            <TouchableOpacity onPress={() => this.handleCircleClick(index)}>
                                <View
                                    {...this.panResponders[index].panHandlers}
                                    style={[
                                        GeneralStyle.circle,
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
                                            fill={this.state.currentPhase[index].ball ? "rgba(255, 165, 0, 0.5)" : "rgba(0, 0, 0, 0.05)"}
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

                    {this.state.arrows.map(arrow => arrow)}

                    <TouchableOpacity
                        style={GeneralStyle.sendPhaseButton}
                        onPress={this.createPhase}
                        disabled={this.state.setInitialPosition}
                    >
                        <Text style={{color: 'white'}}>{!this.state.ballBeenShot ? "Send Phase" : "Done"}</Text>
                    </TouchableOpacity>
                    {this.state.setInitialPosition && (<TouchableOpacity
                        style={GeneralStyle.setInitialPositionButton}
                        onPress={this.createPhase}
                        disabled={!this.state.setInitialPosition}
                    >
                        <Text style={{color: 'white'}}>Set initial position</Text>
                    </TouchableOpacity>)}
                    {(this.state.menuVisible && !this.state.ballBeenShot) && (
                        <View style={GeneralStyle.menuContainer}>
                            {!this.state.currentPhase[this.state.selectedCircle].ball &&
                                (<View style={GeneralStyle.menu}>
                                        <TouchableOpacity style={GeneralStyle.menuItem}
                                                          onPress={() => this.handleMenuClick(1)}>
                                            <Text style={GeneralStyle.menuText}>Cut</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={GeneralStyle.menuItem}
                                                          onPress={() => this.handleMenuClick(3)}>
                                            <Text style={GeneralStyle.menuText}>Screen</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            {this.state.currentPhase[this.state.selectedCircle].ball &&
                                (<View style={GeneralStyle.menu}>
                                        {!this.state.ballBeenPassed &&
                                            (<TouchableOpacity style={GeneralStyle.menuItem}
                                                               onPress={() => this.handlePass()}>
                                                <Text style={GeneralStyle.menuText}>Pass</Text>
                                            </TouchableOpacity>)}
                                        <TouchableOpacity style={GeneralStyle.menuItem}
                                                          onPress={() => this.handleMenuClick(2)}>
                                            <Text style={GeneralStyle.menuText}>Dribble</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={GeneralStyle.menuItem}
                                                          onPress={() => this.handleMenuClick(5)}>
                                            <Text style={GeneralStyle.menuText}>Shoot</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                        </View>
                    )}
                    {this.state.setBallMenuVisible && (
                        <View style={GeneralStyle.menuContainer}>
                            <View style={GeneralStyle.menu}>
                                <TouchableOpacity style={GeneralStyle.menuItem} onPress={() => this.handleBallMenuClick()}>
                                    <Text style={GeneralStyle.menuText}>Add Ball</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {this.state.setInitialPosition && (
                        <View style={GeneralStyle.instructionContainer}>
                            <Text style={GeneralStyle.instructionText}>Add Ball to one of your players and move them to their
                                starting position.</Text>
                        </View>
                    )}

                    {this.state.waitingForPass && (
                        <View style={GeneralStyle.instructionContainer}>
                            <Text style={GeneralStyle.instructionText}>Click a player to pass.</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

export default CreatePhase;
