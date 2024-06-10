import React from 'react';
import BaseArrow from './BaseArrow';
import GeneralStyle from "./GeneralStyle";
import {Dimensions, View} from "react-native";
import Svg from "react-native-svg";

class CutArrow extends BaseArrow {
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

export default CutArrow;
