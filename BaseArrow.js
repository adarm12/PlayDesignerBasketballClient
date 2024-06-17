import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Line, Path, Polygon, Circle } from 'react-native-svg';
import GeneralStyle from './GeneralStyle';
import {distance} from "mathjs";


class BaseArrow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x0: props.x0,
            y0: props.y0,
            x1: props.x1,
            y1: props.y1,
            cx: props.cx,
            cy: props.cy
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                x0: this.props.x0,
                y0: this.props.y0,
                x1: this.props.x1,
                y1: this.props.y1,
                cx: this.props.cx,
                cy: this.props.cy
            });
        }
    }

    calculateArrowHead(cx, cy, x1, y1) {
        const midX = (this.state.x0+x1)/2;
        const midY = (this.state.y0+y1)/2;

        const doubleX = 2*cx-midX;
        const doubleY = 2*cy-midY;

        const angle = Math.atan2(y1 - doubleY, x1 - doubleX);
        const arrowHeadLength = 20;
        const arrowHeadAngle = Math.PI / 6;

        const x2 = x1 - arrowHeadLength * Math.cos(angle - arrowHeadAngle);
        const y2 = y1 - arrowHeadLength * Math.sin(angle - arrowHeadAngle);
        const x3 = x1 - arrowHeadLength * Math.cos(angle + arrowHeadAngle);
        const y3 = y1 - arrowHeadLength * Math.sin(angle + arrowHeadAngle);

        return { x2, y2, x3, y3 };
    }



    renderArrowLine() {
        const { x0, y0, x1, y1, cx, cy } = this.state;
        if (cx !== undefined && cy !== undefined) {
            const midX = (x0+x1)/2;
            const midY = (y0+y1)/2;

            const doubleX = 2*cx-midX;
            const doubleY = 2*cy-midY;


            // Path data for the curve
            const pathData = `M${x0},${y0} Q${doubleX},${doubleY} ${x1},${y1}`;

            return (

                <Path
                    d={pathData}
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                />
            );
        } else {
            return (
                <Line
                    x1={x0}
                    y1={y0}
                    x2={x1}
                    y2={y1}
                    stroke="black"
                    strokeWidth="2"
                />
            );
        }
    }

    renderArrowHead() {
        const { x0, y0, x1, y1, cx, cy } = this.state;
        const controlX = cx !== undefined ? cx : x0;
        const controlY = cy !== undefined ? cy : y0;
        const { x2, y2, x3, y3 } = this.calculateArrowHead(controlX, controlY, x1, y1);
        return (
            <Polygon
                points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                fill="black"
            />
        );
    }



    render() {
        const { x0, y0, x1, y1 } = this.state;
        if (x0 === '' || y0 === '' || x1 === '' || y1 === '') return null;

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

export default BaseArrow;
