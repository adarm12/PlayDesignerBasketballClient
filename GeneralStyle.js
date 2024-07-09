import {StyleSheet} from "react-native";
import {DIMENSIONS} from "./Constants";

const generalStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#067b8f"

    },

    arrowContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: 200,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
    },
    goBackButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 5,
        height: 40,
        width: 40,
        zIndex: 1,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    arrow: {
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'black'
    },


    //phase stuff
    phaseContainer: {
        flex: 1,
        backgroundColor: '#e0c298'
    },
    gestureHandler: {
        position: 'absolute',
    },
    sendPhaseButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        backgroundColor: '#059f4e',
        padding: 10,
        borderRadius: 5
    },
    setInitialPositionButton: {
        position: 'absolute',
        bottom: 50,
        left: '0%',
        marginLeft: 0,
        backgroundColor: '#059f4e',
        padding: 10,
        borderRadius: 5
    },
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        left: '67%',
        width: DIMENSIONS.WIDTH / 3,
        backgroundColor: 'rgba(241, 241, 241, 0.5)',
        padding: 10,
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 5,
    },
    menuItem: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
        marginVertical: 5
    },
    menuText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    debugText: {
        position: 'absolute',
        top: 50,
        left: '50%',
        marginLeft: -75,
        fontSize: 16,
        color: 'red'
    },
    instructionContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    instructionText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center'
    },
    circle: {
        position: 'absolute',
    },

    playArea: {
        height: DIMENSIONS.HEIGHT,
        width: DIMENSIONS.WIDTH,
    },

    nextButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#059f4e',
        padding: 10,
        borderRadius: 5,
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: '#059f4e',
        padding: 10,
        borderRadius: 5,
    },
    whiteButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },


});

export default generalStyle;
