import React from 'react';
import BaseArrow from './BaseArrow';
import GeneralStyle from "./GeneralStyle";
import {Dimensions, View} from "react-native";
import Svg, {Line, Polygon} from "react-native-svg";

class DribbleArrow extends BaseArrow {
    getPointOnQuadraticBezier(t, p0, p1, p2) {
        const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
        const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
        return { x, y };
    }

    getTangentAngleOnQuadraticBezier(t, p0, p1, p2) {
        const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x);
        const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y);
        return Math.atan2(dy, dx);
    }

    renderArrowLine() {
        const { x0, y0, x1, y1, cx, cy } = this.state;
        const midX = (x0+x1)/2;
        const midY = (y0+y1)/2;

        const doubleX = 2*cx-midX;
        const doubleY = 2*cy-midY;

        const pathData = cx !== undefined && cy !== undefined &&cx!==-1 &&cy!==-1
            ? `M${x0},${y0} Q${doubleY},${doubleX} ${x1},${y1}`
            : `M${x0},${y0} L${x1},${y1}`;

        const totalLength = cx !== undefined && cy !== undefined
            ? Math.sqrt(Math.pow(doubleX - x0, 2) + Math.pow(doubleY - y0, 2)) + Math.sqrt(Math.pow(x1 - doubleX, 2) + Math.pow(y1 - doubleY, 2))
            : Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));

        const zigzagLength = 7;
        const zigzagCount = Math.max(1, Math.floor(totalLength / zigzagLength));
        const zigzagOffset = 5;

        const zigzagPoints = [];
        for (let i = 0; i <= zigzagCount; i++) {
            const t = i / zigzagCount;
            const point = doubleX !== undefined && doubleY !== undefined
                ? this.getPointOnQuadraticBezier(t, { x: x0, y: y0 }, { x: doubleX, y: doubleY }, { x: x1, y: y1 })
                : { x: x0 + t * (x1 - x0), y: y0 + t * (y1 - y0) };
            const angle = doubleX !== undefined && doubleY !== undefined
                ? this.getTangentAngleOnQuadraticBezier(t, { x: x0, y: y0 }, { x: doubleX, y: doubleY }, { x: x1, y: y1 })
                : Math.atan2(y1 - y0, x1 - x0);
            const zigzagX = i % 2 === 0
                ? point.x + zigzagOffset * Math.cos(angle + Math.PI / 2)
                : point.x + zigzagOffset * Math.cos(angle - Math.PI / 2);
            const zigzagY = i % 2 === 0
                ? point.y + zigzagOffset * Math.sin(angle + Math.PI / 2)
                : point.y + zigzagOffset * Math.sin(angle - Math.PI / 2);
            zigzagPoints.push({ x: zigzagX, y: zigzagY });
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
