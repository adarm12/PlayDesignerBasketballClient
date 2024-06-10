import React from 'react';
import BaseArrow from './BaseArrow';
import GeneralStyle from "./GeneralStyle";
import {Dimensions, View} from "react-native";
import Svg, {Line} from "react-native-svg";



class DribbleArrow extends BaseArrow {
    renderArrowLine() {
        const { x0, y0, x1, y1 } = this.state;
        const angle = Math.atan2(y1 - y0, x1 - x0);
        const arrowLength = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        const zigzagLength = 7;
        const zigzagCount = Math.max(1, Math.floor(arrowLength / zigzagLength));
        const zigzagOffset = 5;

        const zigzagPoints = [];
        for (let i = 0; i <= zigzagCount; i++) {
            const zigzagX = x0 + i * (arrowLength / zigzagCount) * Math.cos(angle);
            const zigzagY = y0 + i * (arrowLength / zigzagCount) * Math.sin(angle);
            zigzagPoints.push(
                i % 2 === 0
                    ? { x: zigzagX + zigzagOffset * Math.cos(angle + Math.PI / 2), y: zigzagY + zigzagOffset * Math.sin(angle + Math.PI / 2) }
                    : { x: zigzagX + zigzagOffset * Math.cos(angle - Math.PI / 2), y: zigzagY + zigzagOffset * Math.sin(angle - Math.PI / 2) }
            );
        }

        return (
            <>
                {zigzagPoints.map((point, index) => (
                    index < zigzagPoints.length - 1 && (
                        <Line
                            key={index}
                            x1={index === 0 ? x0 : zigzagPoints[index - 1].x}
                            y1={index === 0 ? y0 : zigzagPoints[index - 1].y}
                            x2={point.x}
                            y2={point.y}
                            stroke="black"
                            strokeWidth="2"
                        />
                    )
                ))}
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

export default DribbleArrow;
