import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'; 
import React, { useState } from 'react';
import { ReusableText, ReusableTouchable, HeightSpacer, ReusableTextInput } from '../../../components'; 
import { navigationRef } from '../../../utilities/navigation/NavigationService'; 

const SignUp4 = ({ route }) => { 
    const { email, petName, petType, breedType, petAge, images } = route.params; 
    const [petBio, setPetBio] = useState(''); 

    const handleSubmit = () => {
        navigationRef.navigate('SignUp5', { email, petName, petType, breedType, petAge, images, petBio }); 
    }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <ReusableText text="Write a bit about your pet" color="black" fontSize={20} />
        <HeightSpacer height={20} /> 
        <ReusableTextInput
            placeholder="Write pet bio"
            fontFamily="Arial"
            value={petBio} 
            onChangeText={setPetBio} 
            fontSize={16}
            color="black"
            width={"92.5%"}
            height={"22.5%"}
            borderColor="gray"
            borderWidth={1}
            multiline={true}
            maxLines={8} 
        />
        <HeightSpacer height={20} />
        <ReusableTouchable
            btnText="Submit"
            width={200} 
            onPress={handleSubmit} 
            textColor="white"
            backgroundColor="red"
            borderWidth={1}
            borderColor="red"
        /> 
    </View>
    </TouchableWithoutFeedback> 
  )
} 

export default SignUp4

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }, 
}) 