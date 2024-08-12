import React, { Component } from 'react';
import { Animated } from 'react-native';
import Svg, { Line } from 'react-native-svg';

class Defender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animatedX: new Animated.Value(props.x),
            animatedY: new Animated.Value(props.y),
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
            this.animatePosition();
        }
    }

    animatePosition = () => {
        const { x, y } = this.props;

        Animated.timing(this.state.animatedX, {
            toValue: x,
            duration: 1000,
            useNativeDriver: false,
        }).start();

        Animated.timing(this.state.animatedY, {
            toValue: y,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    };

    render() {
        const { size = 20, color = 'black' } = this.props;
        const { animatedX, animatedY } = this.state;

        return (
            <Animated.View style={{ position: 'absolute', left: animatedX, top: animatedY }}>
                <Svg height={size} width={size}>
                    <Line
                        x1="0"
                        y1="0"
                        x2={size}
                        y2={size}
                        stroke={color}
                        strokeWidth="2"
                    />
                    <Line
                        x1={size}
                        y1="0"
                        x2="0"
                        y2={size}
                        stroke={color}
                        strokeWidth="2"
                    />
                </Svg>
            </Animated.View>
        );
    }
}

export default Defender;
