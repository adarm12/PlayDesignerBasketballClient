import {StyleSheet} from "react-native";

const generalStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#067b8f"
    },
    arrowContainer: {
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

});

export default generalStyle;
