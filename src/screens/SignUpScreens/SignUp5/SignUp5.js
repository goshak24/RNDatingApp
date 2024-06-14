import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { ReusableTouchable } from '../../../components'
import { navigationRef } from '../../../utilities/navigation/NavigationService'

const SignUp5 = ({ route }) => {
    const { email, petName, petType, breedType, petAge, images, petBio } = route.params; 
    const [healthInfo, setHealthInfo] = useState(''); 

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>HealthInfo</Text>
        <ReusableTouchable btnText="Moving On" width={200} onPress={() => navigationRef.navigate('SignUp6', { email, petName, petType, breedType, petAge, images, petBio, healthInfo })} 
        textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" /> 
      </View>
      </TouchableWithoutFeedback>
  )
}

export default SignUp5

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    }, 
}) 