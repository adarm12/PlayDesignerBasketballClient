// constants.js
import {Dimensions} from "react-native";

export const COLORS = {
    PRIMARY: '#3498db',
    SECONDARY: '#2ecc71',
    TERTIARY: '#e74c3c',
    BACKGROUND: '#ecf0f1',
    TEXT: '#2c3e50'
};

export const DIMENSIONS = {
    WIDTH: Dimensions.get('window').width,
    HEIGHT: Dimensions.get('window').height,

};

export const CIRCLE_RADIUS=25/414*DIMENSIONS.WIDTH;
export const DEFENDER_SIZE=20/414*DIMENSIONS.WIDTH;

export const ACTIONS = {
    CUT: 1,
    DRIBBLE: 2,
    SCREEN: 3,
    SHOOT:5

};

export const BASKET = {
    LEFT: DIMENSIONS.WIDTH/2,
    TOP: DIMENSIONS.HEIGHT/5

};

export const ZONE_DEFENDERS = {
    DOWN_LEFT: {
        X: DIMENSIONS.WIDTH/5,
        Y:DIMENSIONS.HEIGHT/3.5
    },
    DOWN_RIGHT: {
        X: 4*DIMENSIONS.WIDTH/5,
        Y:DIMENSIONS.HEIGHT/3.5
    },
    MIDDLE: {
        X: DIMENSIONS.WIDTH/2,
        Y:DIMENSIONS.HEIGHT/2.6
    },
    TOP_LEFT: {
        X: DIMENSIONS.WIDTH/4,
        Y:DIMENSIONS.HEIGHT/2
    },
    TOP_RIGHT: {
        X: 3*DIMENSIONS.WIDTH/4,
        Y:DIMENSIONS.HEIGHT/2
    },

};

export const DEFENSE_TYPE = {
    MAN_TO_MAN: 1,
    ZONE: 2

};

export const FONTS = {
    REGULAR: 'Roboto-Regular',
    BOLD: 'Roboto-Bold',
    ITALIC: 'Roboto-Italic'
};

export const API = {
    BASE_URL: 'https://api.example.com',
    LOGIN: '/login',
    REGISTER: '/register',
    GET_USER: '/user'
};

export const MESSAGES = {
    SUCCESS: 'Operation was successful!',
    ERROR: 'Something went wrong. Please try again.',
    LOADING: 'Loading, please wait...'
};
