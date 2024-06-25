import React, { Component } from 'react';
import { Animated, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import GeneralStyle from "./GeneralStyle";
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import {ACTIONS, CIRCLE_RADIUS, DIMENSIONS} from "./Constants";
import { drawArrowsBetweenTwoPhases } from "./DrawArrows";



class ShowPlay extends Component {
    state = {
        phaseNavigator: 0,
        drawArrows: false,
        arrows: [],
        animatedPositions: [],
        play:  {
            "id": 1,
            "name": "three",
            "phases": [
                {
                    "id": 95,
                    "orderNum": 1,
                    "playerPhases": [
                        {
                            "id": 466,
                            "playerNumber": 1,
                            "hasBall": true,
                            "x": 261,
                            "y": 652,
                            "cx": 0,
                            "cy": 0,
                            "action": 0
                        },
                        {
                            "id": 467,
                            "playerNumber": 2,
                            "hasBall": false,
                            "x": 392,
                            "y": 558,
                            "cx": 0,
                            "cy": 0,
                            "action": 0
                        },
                        {
                            "id": 468,
                            "playerNumber": 3,
                            "hasBall": false,
                            "x": 35,
                            "y": 566,
                            "cx": 0,
                            "cy": 0,
                            "action": 0
                        },
                        {
                            "id": 469,
                            "playerNumber": 4,
                            "hasBall": false,
                            "x": 302,
                            "y": 271,
                            "cx": 0,
                            "cy": 0,
                            "action": 0
                        },
                        {
                            "id": 470,
                            "playerNumber": 5,
                            "hasBall": false,
                            "x": 115,
                            "y": 220,
                            "cx": 0,
                            "cy": 0,
                            "action": 0
                        }
                    ]
                },
                {
                    "id": 96,
                    "orderNum": 1,
                    "playerPhases": [
                        {
                            "id": 471,
                            "playerNumber": 1,
                            "hasBall": false,
                            "x": 38,
                            "y": 297,
                            "cx": 55,
                            "cy": 533,
                            "action": 1
                        },
                        {
                            "id": 472,
                            "playerNumber": 2,
                            "hasBall": false,
                            "x": 392,
                            "y": 558,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 473,
                            "playerNumber": 3,
                            "hasBall": false,
                            "x": 240,
                            "y": 624,
                            "cx": 166,
                            "cy": 613,
                            "action": 3
                        },
                        {
                            "id": 474,
                            "playerNumber": 4,
                            "hasBall": true,
                            "x": 302,
                            "y": 271,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 475,
                            "playerNumber": 5,
                            "hasBall": false,
                            "x": 115,
                            "y": 220,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        }
                    ]
                },
                {
                    "id": 97,
                    "orderNum": 1,
                    "playerPhases": [
                        {
                            "id": 476,
                            "playerNumber": 1,
                            "hasBall": false,
                            "x": 38,
                            "y": 297,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 477,
                            "playerNumber": 2,
                            "hasBall": false,
                            "x": 392,
                            "y": 558,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 478,
                            "playerNumber": 3,
                            "hasBall": false,
                            "x": 240,
                            "y": 624,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 479,
                            "playerNumber": 4,
                            "hasBall": true,
                            "x": 359,
                            "y": 548,
                            "cx": 360,
                            "cy": 434,
                            "action": 2
                        },
                        {
                            "id": 480,
                            "playerNumber": 5,
                            "hasBall": false,
                            "x": 115,
                            "y": 220,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        }
                    ]
                },
                {
                    "id": 98,
                    "orderNum": 1,
                    "playerPhases": [
                        {
                            "id": 481,
                            "playerNumber": 1,
                            "hasBall": false,
                            "x": 38,
                            "y": 297,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 482,
                            "playerNumber": 2,
                            "hasBall": true,
                            "x": 252,
                            "y": 257,
                            "cx": 370,
                            "cy": 384,
                            "action": 2
                        },
                        {
                            "id": 483,
                            "playerNumber": 3,
                            "hasBall": false,
                            "x": 240,
                            "y": 624,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 484,
                            "playerNumber": 4,
                            "hasBall": false,
                            "x": 359,
                            "y": 548,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 485,
                            "playerNumber": 5,
                            "hasBall": false,
                            "x": 115,
                            "y": 220,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        }
                    ]
                },
                {
                    "id": 99,
                    "orderNum": 1,
                    "playerPhases": [
                        {
                            "id": 486,
                            "playerNumber": 1,
                            "hasBall": false,
                            "x": 38,
                            "y": 297,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 487,
                            "playerNumber": 2,
                            "hasBall": false,
                            "x": 252,
                            "y": 257,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 488,
                            "playerNumber": 3,
                            "hasBall": true,
                            "x": 78,
                            "y": 539,
                            "cx": 159,
                            "cy": 581,
                            "action": 1
                        },
                        {
                            "id": 489,
                            "playerNumber": 4,
                            "hasBall": false,
                            "x": 359,
                            "y": 548,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        },
                        {
                            "id": 490,
                            "playerNumber": 5,
                            "hasBall": false,
                            "x": 115,
                            "y": 220,
                            "cx": -1,
                            "cy": -1,
                            "action": 0
                        }
                    ]
                }
            ]
        }
    };

    componentDidMount() {
        this.sortPhases();
        this.initializeAnimatedPositions();
    }

    sortPhases() {
        const { play } = this.state;

        const sortedPhases = play.phases.map(phase => {
            return {
                ...phase,
                playerPhases: phase.playerPhases.sort((a, b) => a.playerNumber - b.playerNumber)
            };
        });

        this.setState({
            play: {
                ...play,
                phases: sortedPhases
            }
        });
    }

    initializeAnimatedPositions = (phaseIndex = 0) => {
        const { play } = this.state;
        const currentPhase = play.phases[phaseIndex];

        const animatedPositions = currentPhase.playerPhases.map(playerPhase => ({
            id: playerPhase.id,
            playerNumber: playerPhase.playerNumber,
            hasBall: playerPhase.hasBall,
            position: new Animated.ValueXY({ x: playerPhase.x, y: playerPhase.y }),
            controlPosition: new Animated.ValueXY({ x: playerPhase.cx, y: playerPhase.cy })
        }));

        this.setState({ animatedPositions });
    };

    moveCirclesToNextPhase = () => {

        const { play, phaseNavigator, animatedPositions } = this.state;
        const nextPhase = play.phases[phaseNavigator + 1];

        if (!nextPhase) return;

        nextPhase.playerPhases.forEach((playerPhase, index) => {
            const animatedPosition = animatedPositions.find(pos => pos.playerNumber === playerPhase.playerNumber);

            if (animatedPosition) {
                const startX = animatedPosition.position.x._value;
                const startY = animatedPosition.position.y._value;
                const endX = playerPhase.x;
                const endY = playerPhase.y;
                const controlX = playerPhase.cx;
                const controlY = playerPhase.cy;

                // Ensure all coordinates are valid numbers
                if (isNaN(startX) || isNaN(startY) || isNaN(endX) || isNaN(endY) || isNaN(controlX) || isNaN(controlY)) {
                    console.error('Invalid coordinates:', { startX, startY, endX, endY, controlX, controlY });
                    return;
                }

                if (controlX!==-1 && controlY!== -1) {
                    // Define the duration of the animation
                    const distance = Math.sqrt(Math.pow((startX-controlX),2)+Math.pow((startY-controlY),2)) + Math.sqrt(Math.pow((endX-controlX),2)+Math.pow((endY-controlY),2))
                    const duration = 2*distance;

                    const midX = (startX+endX)/2;
                    const midY = (startY+endY)/2;

                    const doubleX = 2*controlX-midX;
                    const doubleY = 2*controlY-midY;

                    // Create an array to store the animation values for the curve
                    const animationValues = [];
                    const steps = distance/4; // Number of steps for the animation
                    for (let t = 0; t <= 1; t += 1 / steps) {
                        const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * doubleX + Math.pow(t, 2) * endX;
                        const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * doubleY + Math.pow(t, 2) * endY;
                        animationValues.push({x, y});
                    }

                    // Create an Animated sequence for the curve animation
                    Animated.sequence(
                        animationValues.map((value, index) => {
                            return Animated.timing(animatedPosition.position, {
                                toValue: value,
                                duration: duration / steps,
                                useNativeDriver: false
                            });
                        })
                    ).start(() =>{
                        this.updateBallState()
                    });
                }
            }
        });
    };

    updateBallState = (before) => {
        const { play, phaseNavigator, animatedPositions } = this.state;
        let currentPhase;
        if (before) {
            currentPhase = play.phases[phaseNavigator+1];
        }
        else {
            currentPhase = play.phases[phaseNavigator];
        }
        const updatedPositions = animatedPositions.map((animatedPosition) => {
            const currentPlayerPhase = currentPhase.playerPhases.find(
                (playerPhase) => playerPhase.playerNumber === animatedPosition.playerNumber
            );

            if (currentPlayerPhase) {
                return {
                    ...animatedPosition,
                    hasBall: currentPlayerPhase.hasBall,
                };
            }

            return animatedPosition;
        });

        this.setState({ animatedPositions: updatedPositions });
    };

    handleNextPress = () => {
        const { play, phaseNavigator, animatedPositions } = this.state;

        if (phaseNavigator<play.phases.length-2) {
            const playerWithBall = play.phases[phaseNavigator].playerPhases.find(player => player.hasBall);
            const playerHadBall = play.phases[phaseNavigator + 1].playerPhases.find(player => player.playerNumber === playerWithBall.playerNumber);

            const playerWillHaveBall = play.phases[phaseNavigator + 1].playerPhases.find(player => player.hasBall);
            if (playerHadBall.action === ACTIONS.CUT || playerWillHaveBall.action === ACTIONS.DRIBBLE) {
                console.log("here")
                this.updateBallState(true)
            }
        }


        this.setState(
            prevState => {
                if (prevState.drawArrows) {
                    const nextPhaseNavigator = Math.min(prevState.phaseNavigator + 1, prevState.play.phases.length - 1);
                    this.moveCirclesToNextPhase(prevState.play.phases[prevState.phaseNavigator], prevState.play.phases[nextPhaseNavigator]);

                    return {
                        phaseNavigator: nextPhaseNavigator,
                        drawArrows: false,
                        arrows: []
                    };
                } else {
                    return {
                        drawArrows: true
                    };
                }
            },
            () => {
                if (this.state.drawArrows) {
                    this.drawArrows();
                }
            }
        );
    };

    handleBackPress = () => {
        this.setState(prevState => {
            const prevPhaseNavigator = Math.max(prevState.phaseNavigator - 1, 0);
            return {
                phaseNavigator: prevPhaseNavigator,
                drawArrows: false,
                arrows: []
            };
        }, () => {
            this.initializeAnimatedPositions(this.state.phaseNavigator);
        });
    };

    renderCircles = () => {
        return this.state.animatedPositions.map(animatedPosition => (
            <Animated.View
                key={animatedPosition.id}
                style={[
                    GeneralStyle.circle,
                    {
                        transform: [
                            { translateX: Animated.add(animatedPosition.position.x, new Animated.Value(-CIRCLE_RADIUS)) },
                            { translateY: Animated.add(animatedPosition.position.y, new Animated.Value(-CIRCLE_RADIUS)) }
                        ],
                    },
                ]}
            >
                <Svg height={60} width={60}>
                    <Circle
                        cx="30"
                        cy="30"
                        r={CIRCLE_RADIUS}
                        stroke="black"
                        strokeWidth="2.5"
                        fill={animatedPosition.hasBall ? "rgba(255, 165, 0, 0.5)" : "rgba(0, 0, 0, 0.05)"}
                    />
                    <SvgText
                        x="30"
                        y="35"
                        fontSize="25"
                        fill="black"
                        textAnchor="middle"
                        fontWeight="bold"
                    >
                        {animatedPosition.playerNumber}
                    </SvgText>
                </Svg>
            </Animated.View>
        ));
    };

    drawArrows = () => {
        const { play, phaseNavigator } = this.state;
        if (phaseNavigator >= play.phases.length - 1) return;

        const currentPhase = play.phases[phaseNavigator];
        const nextPhase = play.phases[phaseNavigator + 1];

        const newArrows = drawArrowsBetweenTwoPhases(
            currentPhase.playerPhases,
            nextPhase.playerPhases
        );

        console.log(newArrows);
        this.setState({ arrows: newArrows });
    };

    render() {
        return (
            <View style={[GeneralStyle.phaseContainer]}>
                <View style={[GeneralStyle.phaseContainer, GeneralStyle.playArea]}>
                    {this.renderCircles()}
                    {this.state.arrows}

                    <TouchableOpacity style={GeneralStyle.nextButton} onPress={this.handleNextPress}>
                        <Text style={GeneralStyle.whiteButtonText}>Next</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={GeneralStyle.backButton} onPress={this.handleBackPress}>
                        <Text style={GeneralStyle.whiteButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}



export default ShowPlay;
