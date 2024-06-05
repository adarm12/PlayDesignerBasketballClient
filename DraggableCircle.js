import React, { Component } from 'react';
import { TouchableOpacity, PanResponder, View, StyleSheet, Dimensions, Text as RNText } from 'react-native';
import { Circle, Svg, Text as SvgText } from 'react-native-svg';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import {} from "react-native-svg/lib/typescript/ReactNativeSVG";

class DraggableCircle extends Component {
    state = {
        circles: [
            { x: 100, y: 100, draggable: true },
            { x: 100, y: 200, draggable: true },
        ],
    };

    circleRadius = 25; // Radius of the circle

    panResponders = this.state.circles.map((circle, index) =>
        PanResponder.create({
            onStartShouldSetPanResponder: () => this.state.circles[index].draggable,
            onPanResponderMove: (event, gestureState) => {
                if (this.state.circles[index].draggable) {
                    const newCircles = [...this.state.circles];
                    newCircles[index] = {
                        ...newCircles[index],
                        x: gestureState.moveX,
                        y: gestureState.moveY,
                    };
                    this.setState({ circles: newCircles });
                }
            },
        })
    );

    toggleDraggable = () => {
        this.setState((prevState) => ({
            circles: prevState.circles.map(circle => ({
                ...circle,
                draggable: !circle.draggable
            }))
        }));
    };

    render() {
        return (
            <View style={styles.container} width={Dimensions.get("window").width} height={Dimensions.get("window").height}>
                {this.state.circles.map((item, index) => (
                    <GestureHandlerRootView key={index} style={styles.gestureHandler}>
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
                    </GestureHandlerRootView>
                ))}

                <TouchableOpacity style={styles.button} onPress={this.toggleDraggable}>
                    <RNText style={styles.buttonText}>
                        {this.state.circles[0].draggable ? 'Disable Dragging' : 'Enable Dragging'}
                    </RNText>
                </TouchableOpacity>

                <RNText style={styles.debugText}>
                    Phase: {this.state.circles.map((item, index) => (
                    <RNText key={index}>{item.x},{item.y} </RNText>
                ))}
                </RNText>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gestureHandler: {
        position: 'absolute',
    },
    circle: {
        position: 'absolute',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        left: Dimensions.get('window').width / 2 - 100,
        width: 200,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
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

export default DraggableCircle;
