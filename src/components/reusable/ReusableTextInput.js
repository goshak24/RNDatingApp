import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

// Default number of lines is 1 
const ReusableTextInput = ({ placeholder, value, onChangeText, fontFamily, fontSize, color, 
  secureTextEntry, width, height, borderColor, borderWidth, multiline = false, maxLines = null 
}) => { 
  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      borderColor: borderColor,
      borderWidth: borderWidth,
      padding: 10, 
    },
    textStyle: {
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: color,
      textAlignVertical: 'top', // Ensures text starts at the top for multiline inputs, otherwise at the center 
      flex: 1, 
    },
  });

  const handleTextChange = (text) => {
    if (maxLines) {
      const lines = text.split('\n');
      if (lines.length <= maxLines) {
        onChangeText(text);
      } else {
        // Limit the text to the allowed number of lines
        const limitedText = lines.slice(0, maxLines).join('\n');
        onChangeText(limitedText);
      }
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
};

export default ReusableTextInput; 