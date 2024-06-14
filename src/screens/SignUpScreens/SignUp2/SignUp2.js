import { StyleSheet, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReusableText, HeightSpacer, ReusableModal } from '../../../components';
import ReusableForm from '../../../components/reusable/ReusableForm'; 
import { Context as AuthContext } from '../../../context/AuthContext'; 
import { navigationRef } from '../../../utilities/navigation/NavigationService';

const SignUp2 = () => {
  const [petName, setPetName] = useState(''); 

  const fields = [
    {
      label: "Pet Name", 
      value: petName,
      onChange: setPetName, 
      placeholder: "Enter your pet's name",
    }
  ] 

  return (
    <View style={styles.container}>
      <ReusableForm fields={fields} onSubmit={() => navigationRef.navigate("SignUp3")} buttonText="Next Up" />
      <ReusableModal  />
    </View>
  )
}

export default SignUp2

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }
}) 