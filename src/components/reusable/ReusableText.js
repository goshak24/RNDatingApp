import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReusableText = ({text, color, fontSize, fontFamily}) => {
    const styles = StyleSheet.create({
        textStyle: {
            color: color, 
            fontSize: fontSize, 
            fontFamily: fontFamily 
        }
    }) 

    return (
    <View>
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  )
}

export default ReusableText; 