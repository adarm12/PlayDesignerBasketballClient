import React from 'react';
import {Text, View} from 'react-native';
import generalStyle from "./GeneralStyle";
import {Line, Polygon, Svg} from "react-native-svg";


class Arrows extends React.Component {

    state = {
        point1: {x: 50, y: 50},
        point2: {x: 200, y: 150},
        arrowSize: "",
        angle: "",
        arrowHead1x: '',
        arrowHead1y: '',
        arrowHead2x: '',
        arrowHead2y: '',

    }

    componentDidMount() {
        this.angle();
    }

    angle = () => {
        this.setState({
            angle: (Math.atan2(
                this.state.point2.y - this.state.point1.y
                , this.state.point2.x - this.state.point1.x))
        })
        this.setState({arrowHead1x: (this.state.point2.x - this.state.arrowSize * Math.cos(this.state.angle - Math.PI / 6))});
        this.setState({arrowHead1y: (this.state.point2.y - this.state.arrowSize * Math.sin(this.state.angle - Math.PI / 6))});
        this.setState({arrowHead2x: (this.state.point2.x - this.state.arrowSize * Math.cos(this.state.angle + Math.PI / 6))});
        this.setState({arrowHead2y: (this.state.point2.y - this.state.arrowSize * Math.sin(this.state.angle + Math.PI / 6))});

    }


    render() {
        return (
            <View style={generalStyle.container}>
                <Svg width="100" height="100">
                    <Line x1={this.state.point1.x}
                          x2={this.state.point2.x}
                          y1={this.state.point1.y}
                          y2={this.state.point2.y}
                          stroke={"black"}
                          strokeWidth={"2"}
                    />
                    <Polygon
                        points={this.state.point2.x + ',' + this.state.point2.y + ' ' +
                            this.state.arrowHead1x + ',' + this.state.arrowHead1y + ' ' +
                            this.state.arrowHead2x + ',' + this.state.arrowHead2y
                        }
                    />
                </Svg>
                <Text> {this.state.arrowHead1x}</Text>
                <Text> {this.state.arrowHead1y}</Text>
                <Text> {this.state.arrowHead2x}</Text>
                <Text> {this.state.arrowHead2y}</Text>
            </View>
        );
    }
}

export default Arrows;