import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#9ab7d7',
    primaryDark: '#0d0a68',
    light: '#dbeaf6',
    error: '#f64c4c'
}

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.light
    },
    instructions: {
        alignSelf: 'center',
        margin: 6,
        fontSize: 18,
        textAlign: 'center',
        marginTop: 12
    },
    text: {
        fontSize: 30
    },
    progress:{
        height: 10,
        width: null
    },
    resultsText:{
        fontSize: 20
    }
});
