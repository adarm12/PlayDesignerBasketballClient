import {StyleSheet} from "react-native";
import {DIMENSIONS} from "./Constants";

const generalStyle = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: "#ffffff",
        borderRadius: 5,
        padding: 10,
        alignItems: 'left',
        marginLeft: -80,
        marginTop: 50,
        width: 40,
        height: 40,
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
        backgroundColor: '#4B9CD3', // Changed background color to make circles more visible
    },
    gestureHandler: {
        position: 'absolute',
    },
    sendPhaseButton: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        marginLeft: -50,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    setInitialPositionButton: {
        position: 'absolute',
        bottom: 50,
        left: '0%',
        marginLeft: 0,
        backgroundColor: 'blue',
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
    }

});

export default generalStyle;
