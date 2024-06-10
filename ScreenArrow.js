import React from 'react';
import BaseArrow from './BaseArrow';
import GeneralStyle from "./GeneralStyle";
import {Dimensions, View} from "react-native";
import Svg, {Line} from "react-native-svg";


class ScreenArrow extends BaseArrow {

    renderArrowHead() {
        const { x0, y0, x1, y1 } = this.state;
        const angle = Math.atan2(y1 - y0, x1 - x0);
        const arrowHeadLength = 15;

        // Calculate the coordinates of the vertical part of the "T" arrowhead
        const tx = x1 - arrowHeadLength * Math.cos(angle);
        const ty = y1 - arrowHeadLength * Math.sin(angle);

        // Calculate the coordinates of the horizontal part of the "T" arrowhead
        const x2 = x1 + arrowHeadLength * Math.sin(angle);
        const y2 = y1 - arrowHeadLength * Math.cos(angle);
        const x3 = x1 - arrowHeadLength * Math.sin(angle);
        const y3 = y1 + arrowHeadLength * Math.cos(angle);

        return (
            <>
                {/* Vertical part of the "T" */}
                <Line
                    x1={x1}
                    y1={y1}
                    x2={tx}
                    y2={ty}
                    stroke="black"
                    strokeWidth="2"
                />
                {/* Horizontal part of the "T" */}
                <Line
                    x1={x2}
                    y1={y2}
                    x2={x3}
                    y2={y3}
                    stroke="black"
                    strokeWidth="3"
                />
            </>
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

export default ScreenArrow;