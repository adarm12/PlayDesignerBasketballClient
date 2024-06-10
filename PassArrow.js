import React from 'react';
import BaseArrow from './BaseArrow';
import Svg, { Line, Polygon } from 'react-native-svg';
import {Dimensions, View} from "react-native";
import GeneralStyle from "./GeneralStyle";

class PassArrow extends BaseArrow {
    renderArrowLine() {
        const { x0, y0, x1, y1 } = this.state;
        return (
            <Line
                x1={x0}
                y1={y0}
                x2={x1}
                y2={y1}
                stroke="black"
                strokeWidth="2"
                strokeDasharray="15,7"  // Dashed line pattern
            />
        );
    }

    render() {
        return (
            <View style={GeneralStyle.arrowContainer} height={Dimensions.get('window').height} width={Dimensions.get('window').width} pointerEvents="none">
                <Svg>
                    {this.renderArrowLine()}
                    {this.renderArrowHead()}
                </Svg>
            </View>
        );
    }
}

export default PassArrow;
