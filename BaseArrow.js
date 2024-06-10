import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Line, Polygon } from 'react-native-svg';
import GeneralStyle from './GeneralStyle';

class BaseArrow extends Component {
    state = {
        x0: '',
        y0: '',
        x1: '',
        y1: ''
    };

    componentDidMount() {
        this.setState({
            x0: this.props.x0,
            y0: this.props.y0,
            x1: this.props.x1,
            y1: this.props.y1
        });
    }

    calculateArrowHead(x0, y0, x1, y1) {
        const angle = Math.atan2(y1 - y0, x1 - x0);
        const arrowHeadLength = 20;
        const arrowHeadAngle = Math.PI / 6;

        const x2 = x1 - arrowHeadLength * Math.cos(angle - arrowHeadAngle);
        const y2 = y1 - arrowHeadLength * Math.sin(angle - arrowHeadAngle);
        const x3 = x1 - arrowHeadLength * Math.cos(angle + arrowHeadAngle);
        const y3 = y1 - arrowHeadLength * Math.sin(angle + arrowHeadAngle);

        return { x2, y2, x3, y3 };
    }

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
            />
        );
    }

    renderArrowHead() {
        const { x0, y0, x1, y1 } = this.state;
        const { x2, y2, x3, y3 } = this.calculateArrowHead(x0, y0, x1, y1);
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
