import React, {Component} from 'react';
import {View, TouchableOpacity, Text, PanResponder, ImageBackground} from 'react-native';
import Svg, {Circle, Text as SvgText} from 'react-native-svg';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import axios from "axios";
import {CIRCLE_RADIUS, DEFENSE_TYPE, DIMENSIONS} from "./Constants";
import {drawArrowsBetweenTwoPhases, drawManToManDefenders, drawZoneDefenders} from "./DrawFunctions";
import GeneralStyle from "./GeneralStyle";
import {
    freezeCircles,
    releaseCircles,
    releaseCirclesWithAction,
    deleteOtherBalls,
    prepareNewPhase
} from './PhaseFunctions';
import generalStyle from "./GeneralStyle";

class CreatePhase extends Component {

    state = {
        phaseNumber: 1,
        setInitialPosition: true,

        waitingForPass: false,
        ballBeenPassed: false,
        ballBeenSet: false,
        done: false,
        defense: 0,

        errorCode: "",
        arrows: [],
        defenders:[],
        oldPhases: [],
        currentPhase: [
            {x: DIMENSIONS.WIDTH/4, y: DIMENSIONS.HEIGHT-5*CIRCLE_RADIUS, cx: '', cy: '', action: 0, draggable: false, ball: false, moved: false},
            {x: DIMENSIONS.WIDTH/4+2*CIRCLE_RADIUS, y: DIMENSIONS.HEIGHT-5*CIRCLE_RADIUS, cx: '', cy: '', action: 0, draggable: false, ball: false, moved: false},
            {x: DIMENSIONS.WIDTH/4+4*CIRCLE_RADIUS, y: DIMENSIONS.HEIGHT-5*CIRCLE_RADIUS, cx: '', cy: '', action: 0, draggable: false, ball: false, moved: false},
            {x: DIMENSIONS.WIDTH/4+6*CIRCLE_RADIUS, y: DIMENSIONS.HEIGHT-5*CIRCLE_RADIUS, cx: '', cy: '', action: 0, draggable: false, ball: false, moved: false},
            {x: DIMENSIONS.WIDTH/4+8*CIRCLE_RADIUS, y: DIMENSIONS.HEIGHT-5*CIRCLE_RADIUS, cx: '', cy: '', action: 0, draggable: false, ball: false, moved: false}
        ],
        selectedCircle: null,
        menuVisible: false,
        setBallMenuVisible: false
    };

    componentDidMount() {
        this.setState({
            defense: this.props.defense
        })
        console.log("Initial positions:", this.state.currentPhase);
        {
            console.log(!this.state.setInitialPosition && !this.state.ballBeenSet)
        }
    }

    createPanResponder = (index, isMainCircle) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => this.state.currentPhase[index].draggable,
            onPanResponderMove: (event, gestureState) => {
                if (this.state.currentPhase[index].draggable) {
                    const circle = this.state.currentPhase[index];
                    const newPhase = [...this.state.currentPhase];
                    const lastPhase = this.state.oldPhases[this.state.oldPhases.length - 1];

                    if (isMainCircle) {
                        if (this.state.setInitialPosition) {
                            newPhase[index] = {
                                ...newPhase[index],
                                x: gestureState.moveX,
                                y: gestureState.moveY,
                            };
                        } else if (this.state.oldPhases.length > 0) {
                            if (!circle.moved) {
                                newPhase[index] = {
                                    ...newPhase[index],
                                    x: gestureState.moveX,
                                    y: gestureState.moveY,
                                    cx: (gestureState.moveX + lastPhase[index].x) / 2,
                                    cy: (gestureState.moveY + lastPhase[index].y) / 2,
                                };
                            }
                            else {
                                newPhase[index] = {
                                    ...newPhase[index],
                                    x: gestureState.moveX,
                                    y: gestureState.moveY,
                                };
                            }
                        }
                    } else {
                        newPhase[index] = {
                            ...newPhase[index],
                            cx: gestureState.moveX,
                            cy: gestureState.moveY,
                        };
                    }
                    this.setState({ currentPhase: newPhase });

                    this.drawArrows();
                    this.drawDefenders();

                }
            },
            onPanResponderRelease: (event, gestureState) => {
                const newPhase = [...this.state.currentPhase];
                if (isMainCircle && !this.state.setInitialPosition && this.state.oldPhases.length > 0) {
                    newPhase[index] = {
                        ...newPhase[index],
                        moved: true
                    };
                    this.setState({ currentPhase: newPhase });
                    this.drawArrows();
                }
            }
        });
    };


    panResponders = this.state.currentPhase.map((circle, index) =>
        this.createPanResponder(index, true)
    );

    cxCyPanResponders = this.state.currentPhase.map((circle, index) =>
        this.createPanResponder(index, false)
    );

    createPhase = () => {
        const playerPhases = this.state.currentPhase.map((phase, index) => ({
            playerNumber: index + 1,
            hasBall: phase.ball,
            x: phase.x/DIMENSIONS.WIDTH,
            y: phase.y/DIMENSIONS.HEIGHT,
            cx: phase.cx/DIMENSIONS.WIDTH,
            cy: phase.cy/DIMENSIONS.HEIGHT,
            action: phase.action

        }));


        axios.post(this.props.domain + '/add-phase', {
            secret: this.props.userSecret,
            playName: this.props.playName,
            orderNum: this.state.phaseNumber,
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

        if (!this.state.done) {
            const newPhaseData = prepareNewPhase(this.state);
            this.setState(newPhaseData);
        } else {
            // GoBack
            console.log(this.state.oldPhases);
        }
    };

    finishPlay = () => {
        this.createPhase();
        this.props.goBack();
    }

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
            this.setState({currentPhase: releasedPhases});

            this.drawArrows();
            this.drawDefenders();
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
                return {arrows: newArrows};
            },
        );
    }

    drawDefenders = () => {
        if (this.state.defense===DEFENSE_TYPE.MAN_TO_MAN) {   //man to man defenders
            this.setState(
                prevState => {
                    const newDefenders = drawManToManDefenders(
                            prevState.currentPhase
                        )
                    ;
                    return {defenders: newDefenders};
                },
            );
        }
        else if (this.state.defense===DEFENSE_TYPE.ZONE) {   //zone defense
            this.setState(
                prevState => {
                    const newDefenders = drawZoneDefenders(
                            prevState.currentPhase
                        )
                    ;
                    return {defenders: newDefenders};
                },
            );
        }
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
                return {currentPhase: newPhase, done: true};
            });
        }
    };

    handlePass = () => {
        const frozenPhases = freezeCircles(this.state.currentPhase);
        this.setState({currentPhase: frozenPhases});
        if (!this.state.ballBeenPassed) {
            this.setState({
                waitingForPass: true,
                menuVisible: false
            });
        }
    }

    handleBallMenuClick = () => {
        const releasedPhases = releaseCircles(this.state.currentPhase);
        this.setState({currentPhase: releasedPhases});
        this.setState(prevState => {
            const newPhase = [...prevState.currentPhase];
            newPhase[prevState.selectedCircle].ball = true;
            return {currentPhase: newPhase, setBallMenuVisible: false, ballBeenSet: true};
        });
    }

    renderCircles = () => {
        const circles = this.state.currentPhase;
        return circles.map((item, index) => (
            <GestureHandlerRootView key={index} style={GeneralStyle.gestureHandler}>
                <TouchableOpacity onPress={() => this.handleCircleClick(index)}>
                    <View
                        {...this.panResponders[index].panHandlers}
                        style={[
                            GeneralStyle.circle,
                            {
                                left: item.x - CIRCLE_RADIUS,
                                top: item.y - CIRCLE_RADIUS,
                            },
                        ]}
                    >
                        <Svg height={CIRCLE_RADIUS*2+5} width={CIRCLE_RADIUS*2+5}>
                            <Circle
                                cx={CIRCLE_RADIUS+1.5}
                                cy={CIRCLE_RADIUS+1.5}
                                r={CIRCLE_RADIUS}
                                stroke="black"
                                strokeWidth="2.5"
                                fill={circles[index].ball ? "rgba(255, 165, 0, 0.5)" : "rgba(0, 0, 0, 0.05)"}
                            />
                            <SvgText
                                x={CIRCLE_RADIUS+2}
                                y={CIRCLE_RADIUS+5}
                                fontSize={CIRCLE_RADIUS*3/4}
                                fill="black"
                                textAnchor="middle"
                                fontWeight="bold"
                            >
                                {index + 1}
                            </SvgText>
                        </Svg>
                    </View>
                </TouchableOpacity>

                {this.state.currentPhase[index].cx !== '' && this.state.currentPhase[index].cy !== '' && (
                    <View
                        {...this.cxCyPanResponders[index].panHandlers}
                        style={{
                            position: 'absolute',
                            left: circles[index].cx - 10,
                            top: circles[index].cy - 10,
                            width: 20,
                            height: 20,
                        }}
                    >
                        <Svg height={28} width={28}>
                            <Circle
                                cx="14"
                                cy="14"
                                r="13"
                                fill="black"
                                stroke="white"
                                strokeWidth="2.5"
                            />
                        </Svg>
                    </View>
                )}
            </GestureHandlerRootView>
        ));
    }


    render() {
        return (

            <View style={GeneralStyle.phaseContainer} height={DIMENSIONS.HEIGHT} width={DIMENSIONS.WIDTH}>

                <ImageBackground
                    source={require('./assets/background2.png')}
                    style={GeneralStyle.backgroundImage}
                    resizeMode="contain"
                >
                </ImageBackground>


                {this.renderCircles()}
                {this.state.arrows.map(arrow => arrow)}
                {this.state.defenders.map(defender => defender)}

                {(!this.state.setInitialPosition && !this.state.done) &&
                    <TouchableOpacity
                        style={GeneralStyle.sendPhaseButton}
                        onPress={this.createPhase}
                        disabled={this.state.setInitialPosition}
                    >
                        <Text style={{color: 'white'}}>Next Phase</Text>
                    </TouchableOpacity>
                }


                {this.state.setInitialPosition && (
                    <TouchableOpacity
                        style={GeneralStyle.setInitialPositionButton}
                        onPress={this.createPhase}
                        disabled={(!this.state.setInitialPosition || !this.state.ballBeenSet)}>
                        <Text style={{color: 'white'}}>Set initial position</Text>
                    </TouchableOpacity>)
                }

                {!this.state.setInitialPosition &&
                    <TouchableOpacity
                        style={GeneralStyle.setInitialPositionButton}
                        onPress={this.finishPlay}>
                        <Text style={{color: 'white'}}>Done</Text>
                    </TouchableOpacity>
                }


                {(this.state.menuVisible && !this.state.done) && (
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
                            <TouchableOpacity style={GeneralStyle.menuItem}
                                              onPress={() => this.handleBallMenuClick()}>
                                <Text style={GeneralStyle.menuText}>Add Ball</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {this.state.setInitialPosition && (
                    <View style={GeneralStyle.instructionContainer}>
                        <Text style={GeneralStyle.instructionText}>Add Ball to one of your players and move them to
                            their
                            starting position.</Text>
                    </View>
                )}

                {this.state.waitingForPass && (
                    <View style={GeneralStyle.instructionContainer}>
                        <Text style={GeneralStyle.instructionText}>Click a player to pass.</Text>
                    </View>
                )}
            </View>

        );
    }

}

export default CreatePhase;