// import React, {Component} from 'react';
// import {View, TouchableOpacity, Text, StyleSheet, Dimensions, PanResponder} from 'react-native';
// import Svg, {Circle, Text as SvgText} from 'react-native-svg';
// import axios from 'axios';
// import {GestureHandlerRootView} from "react-native-gesture-handler";
//
// const {width: screenWidth, height: screenHeight} = Dimensions.get('window');
//
// class Tests extends Component {
//     circleRadius = 25; // Radius of the circle
//
//     state = {
//         phaseNumber: 1,
//         setInitialPosition: true,
//         waitingForPass: false,
//         ballBeenPassed: false,
//         ballBeenShot: false,
//
//         oldPhases: [],
//         currentPhase: [
//             {x: 30, y: 200, action: 0, draggable: false, ball: false},
//             {x: 30, y: 260, action: 0, draggable: false, ball: false},
//             {x: 30, y: 320, action: 0, draggable: false, ball: false},
//             {x: 30, y: 380, action: 0, draggable: false, ball: false},
//             {x: 30, y: 440, action: 0, draggable: false, ball: false}
//         ],
//         selectedCircle: null,
//         menuVisible: false,
//         setBallMenuVisible: false
//     };
//
//     componentDidMount() {
//         console.log("Initial positions:", this.state.currentPhase);
//     }
//
//     panResponders = this.state.currentPhase.map((circle, index) =>
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => this.state.currentPhase[index].draggable,
//             onPanResponderMove: (event, gestureState) => {
//                 if (this.state.currentPhase[index].draggable) {
//                     const newPhase = [...this.state.currentPhase];
//                     newPhase[index] = {
//                         ...newPhase[index],
//                         x: gestureState.moveX,
//                         y: gestureState.moveY,
//                     };
//                     this.setState({currentPhase: newPhase});
//                 }
//             },
//         })
//     );
//
//     createPhase = () => {
//         const playerPhases = this.state.currentPhase.map((phase, index) => ({
//             playerNumber: index + 1,
//             hasBall: phase.ball,
//             x: phase.x,
//             y: phase.y,
//             action: phase.action
//         }));
//
//         axios.post("http://10.0.0.8:8989/add-phase", {
//             secret: "630d73f0-16b7-4ecf-b44f-4192dfb96d1e",
//             playName: "three",
//             orderNum: 1,
//             playerPhases
//         })
//             .then(response => {
//                 console.log('Response:', response.data);
//                 if (response.data.success) {
//                     console.log('OK');
//                 }
//                 this.setState({errorCode: response.data.errorCode});
//             })
//             .catch(error => {
//                 console.error('Error sending phase data:', error);
//             });
//
//         this.setState(prevState => ({
//             oldPhases: [...prevState.oldPhases, prevState.currentPhase],
//         }));
//
//         if (!this.state.ballBeenShot) {
//             this.prepareNewPhase();
//         } else {
//             // GoBack
//             console.log(this.state.oldPhases)
//         }
//
//     };
//
//     prepareNewPhase = () => {
//         this.setState(prevState => {
//             const newPhases = prevState.currentPhase.map(phase => ({
//                 ...phase,
//                 draggable: false,
//                 action: 0,
//             }));
//             return {
//                 currentPhase: newPhases,
//                 setInitialPosition: false,
//                 ballBeenPassed: false,
//                 waitingForPass: false,
//                 selectedCircle: null,
//                 menuVisible: false,
//                 setBallMenuVisible: false
//             };
//         });
//         console.log(this.state.currentPhase);
//     }
//
//     //I decided that the first initial phase will be sent to the server, therefore there is no need for this method.
//     //I decided that the action is what the circle did to get to (x,y) and not what it will do to get to the next
//     // setInitialPosition = () => {
//     //     this.setState(prevState => {
//     //         const newPhases = prevState.currentPhase.map(phase => ({
//     //             ...phase,
//     //             draggable: false
//     //         }));
//     //         return {
//     //             currentPhase: newPhases,
//     //             setInitialPosition: false
//     //         };
//     //     });
//     //     console.log(this.state.currentPhase);
//     // };
//
//     handleCircleClick = (index) => {
//
//         if (!this.state.currentPhase[index].draggable && !this.state.setInitialPosition && !this.state.waitingForPass) {
//             this.setState({
//                 selectedCircle: index,
//                 menuVisible: !this.state.menuVisible
//             });
//         } else if (this.state.setInitialPosition) {
//             this.initialPositionCircleClick(index)
//         } else if (this.state.waitingForPass) {
//             this.deleteOtherBalls()
//             this.setState(prevState => {
//                 const newPhase = [...prevState.currentPhase];
//                 newPhase[index].ball = true;
//                 return {currentPhase: newPhase, setBallMenuVisible: false, waitingForPass: false, ballBeenPassed: true};
//             });
//             this.releaseCirclesWithAction()
//
//         }
//     };
//
//     initialPositionCircleClick = (index) => {
//         this.setState({
//             setBallMenuVisible: !this.state.setBallMenuVisible,
//             selectedCircle: index,
//         });
//     }
//
//     handleMenuClick = (action) => {
//
//         if (!this.state.currentPhase[this.state.selectedCircle].draggable && !this.state.setInitialPosition) {
//             this.setState(prevState => {
//                 const newPhase = [...prevState.currentPhase];
//                 newPhase[prevState.selectedCircle].action = action;
//                 newPhase[prevState.selectedCircle].draggable = true;
//                 return {currentPhase: newPhase, menuVisible: false};
//             });
//         }
//         if (action === 5) {
//             this.setState(prevState => {
//                 const newPhase = [...prevState.currentPhase];
//                 newPhase[prevState.selectedCircle].draggable = false;
//                 return {currentPhase: newPhase, ballBeenShot: true};
//             })
//         }
//     };
//
//     handlePass = () => {
//         this.freezeCircles()
//         if (!this.state.ballBeenPassed) {
//             this.setState({
//                 waitingForPass: true,
//                 menuVisible: false
//             })
//         }
//
//     }
//
//
//     handleBallMenuClick = () => {
//         this.releaseCircles()
//         this.setState(prevState => {
//             const newPhase = [...prevState.currentPhase];
//             newPhase[prevState.selectedCircle].ball = true;
//             return {currentPhase: newPhase, setBallMenuVisible: false,};
//         });
//     }
//
//     releaseCircles = () => {
//         this.setState(prevState => {
//             const newPhases = prevState.currentPhase.map(phase => ({
//                 ...phase,
//                 draggable: true,
//             }));
//             return {
//                 currentPhase: newPhases,
//             };
//         });
//     }
//
//     releaseCirclesWithAction = () => {
//         this.setState(prevState => {
//             const newPhases = prevState.currentPhase.map(phase => {
//                 if (phase.action !== 0) {
//                     return {
//                         ...phase,
//                         draggable: true,
//                     };
//                 }
//                 return phase;
//             });
//             return {
//                 currentPhase: newPhases,
//             };
//         });
//     }
//
//
//     freezeCircles = () => {
//         this.setState(prevState => {
//             const newPhases = prevState.currentPhase.map(phase => ({
//                 ...phase,
//                 draggable: false,
//             }));
//             return {
//                 currentPhase: newPhases,
//             };
//         });
//
//     }
//
//     deleteOtherBalls = () => {
//         this.setState(prevState => {
//             const newPhases = prevState.currentPhase.map(phase => ({
//                 ...phase,
//                 ball: false,
//             }));
//             return {
//                 currentPhase: newPhases,
//             };
//         });
//     }
//
//
//     render() {
//         return (
//             <View style={styles.container} height={screenHeight} width={screenWidth}>
//
//                 {/circles/}
//                 {this.state.currentPhase.map((item, index) => (
//                     <GestureHandlerRootView key={index} style={styles.gestureHandler}>
//                         <TouchableOpacity onPress={() => this.handleCircleClick(index)}>
//                             <View
//                                 {...this.panResponders[index].panHandlers}
//                                 style={[
//                                     styles.circle,
//                                     {
//                                         left: item.x - this.circleRadius,
//                                         top: item.y - this.circleRadius,
//                                     },
//                                 ]}
//                             >
//                                 <Svg height={60} width={60}>
//                                     <Circle
//                                         cx="30"
//                                         cy="30"
//                                         r={25}
//                                         stroke="black"
//                                         strokeWidth="2.5"
//                                         fill={this.state.currentPhase[index].ball ? "rgba(255, 165, 0, 0.5)" : "rgba(0, 0, 0, 0.05)"}
//                                     />
//                                     <SvgText
//                                         x="30"
//                                         y="35"
//                                         fontSize="25"
//                                         fill="black"
//                                         textAnchor="middle"
//                                         fontWeight="bold"
//                                     >
//                                         {index + 1}
//                                     </SvgText>
//                                 </Svg>
//
//                             </View>
//                         </TouchableOpacity>
//                     </GestureHandlerRootView>
//                 ))}
//                 {/end of circles stuff/}
//
//
//                 <TouchableOpacity
//                     style={styles.sendPhaseButton}
//                     onPress={this.createPhase}
//                     disabled={this.state.setInitialPosition}
//                 >
//                     <Text style={{color: 'white'}}>{!this.state.ballBeenShot ? "Send Phase" : "Done"}</Text>
//                 </TouchableOpacity>
//
//                 {this.state.setInitialPosition && (<TouchableOpacity
//                     style={styles.setInitialPositionButton}
//                     onPress={this.createPhase}
//                     disabled={!this.state.setInitialPosition}
//                 >
//                     <Text style={{color: 'white'}}>Set initial position</Text>
//                 </TouchableOpacity>)}
//
//                 {/menu stuff/}
//                 {(this.state.menuVisible && !this.state.ballBeenShot) && (
//                     <View style={styles.menuContainer}>
//                         {!this.state.currentPhase[this.state.selectedCircle].ball &&
//
//                             (<View style={styles.menu}>
//                                     <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(1)}>
//                                         <Text style={styles.menuText}>Cut</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(3)}>
//                                         <Text style={styles.menuText}>Screen</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             )}
//                         {this.state.currentPhase[this.state.selectedCircle].ball &&
//                             (<View style={styles.menu}>
//                                     {!this.state.ballBeenPassed &&
//                                         (<TouchableOpacity style={styles.menuItem} onPress={() => this.handlePass()}>
//                                             <Text style={styles.menuText}>Pass</Text>
//                                         </TouchableOpacity>)}
//                                     <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(2)}>
//                                         <Text style={styles.menuText}>Dribble</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.menuItem} onPress={() => this.handleMenuClick(5)}>
//                                         <Text style={styles.menuText}>Shoot</Text>
//                                     </TouchableOpacity>
//                                 </View>
//
//                             )}
//                     </View>
//                 )}
//
//                 {this.state.setBallMenuVisible && (
//                     <View style={styles.menuContainer}>
//                         <View style={styles.menu}>
//                             <TouchableOpacity style={styles.menuItem} onPress={() => this.handleBallMenuClick()}>
//                                 <Text style={styles.menuText}>Add Ball</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//                 {/end of menu stuff/}
//
//                 {/debug stuff!/}
//                 {/*      <Text style={styles.debugText}>Phase: {this.state.currentPhase.map((item, index) => (*/}
//                 {/*     <Text key={index}>{item.x},{item.y} </Text>*/}
//                 {/*</Text>*/}
//
//
//                 user instructions
//                 {this.state.setInitialPosition && (
//                     <View style={styles.instructionContainer}>
//                         <Text style={styles.instructionText}>Add Ball to one of your players and move them to their
//                             starting position.</Text>
//                     </View>
//                 )}
//
//                 {this.state.waitingForPass && (
//                     <View style={styles.instructionContainer}>
//                         <Text style={styles.instructionText}>Click a player to pass.</Text>
//                     </View>
//                 )}
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#4B9CD3', // Changed background color to make circles more visible
//     },
//     gestureHandler: {
//         position: 'absolute',
//     },
//     sendPhaseButton: {
//         position: 'absolute',
//         bottom: 50,
//         left: '50%',
//         marginLeft: -50,
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5
//     },
//     setInitialPositionButton: {
//         position: 'absolute',
//         bottom: 50,
//         left: '0%',
//         marginLeft: 0,
//         backgroundColor: 'blue',
//         padding: 10,
//         borderRadius: 5
//     },
//     menuContainer: {
//         position: 'absolute',
//         bottom: 0,
//         left: '67%',
//         width: screenWidth / 3,
//         backgroundColor: 'rgba(241, 241, 241, 0.5)',
//         padding: 10,
//     },
//     menu: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//     },
//     menuItem: {
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 5,
//         flex: 1,
//         alignItems: 'center',
//         marginVertical: 5
//     },
//     menuText: {
//         fontSize: 16,
//         fontWeight: 'bold'
//     },
//     debugText: {
//         position: 'absolute',
//         top: 50,
//         left: '50%',
//         marginLeft: -75,
//         fontSize: 16,
//         color: 'red'
//     },
//     instructionContainer: {
//         position: 'absolute',
//         top: 35,
//         left: 0,
//         right: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         padding: 10,
//     },
//     instructionText: {
//         fontSize: 16,
//         color: 'white',
//         textAlign: 'center'
//     }
// });
//
// export default Tests;

