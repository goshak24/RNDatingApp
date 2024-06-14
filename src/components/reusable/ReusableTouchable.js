import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const ReusableTouchable = ({ onPress, btnText, textColor, width, backgroundColor, borderWidth, borderColor }) => { 
    const styles = StyleSheet.create({
        container: {
            margin: 5,
            width: width, 
            backgroundColor: backgroundColor, 
            borderWidth: borderWidth, 
            borderColor: borderColor, 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: 10, // Add padding for better touch area 
            borderRadius: 10, 
        },
        text: {
            color: textColor, 
        }
    });

    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <Text style={styles.text}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ReusableTouchable; 