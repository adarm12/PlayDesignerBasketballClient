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

export const CIRCLE_RADIUS=25;

export const ACTIONS = {
    CUT: 1,
    DRIBBLE: 2,
    SCREEN: 3,
    SHOOT:5

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
