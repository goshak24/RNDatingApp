import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const ReusableTextInput = ({ placeholder, value, onChangeText, fontFamily, fontSize, color, secureTextEntry, width, height }) => {
    const styles = StyleSheet.create({
        textStyle: {
            width: width,
            height: height,  
            fontFamily: fontFamily, 
            fontSize: fontSize, 
            color: color
        }
    })
    
    return (
    <View>
      <TextInput style={styles.textStyle} placeholder={placeholder} value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry} /> 
    </View>
  )
}

export default ReusableTextInput; 