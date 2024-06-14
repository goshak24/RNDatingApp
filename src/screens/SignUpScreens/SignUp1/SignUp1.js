import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReusableText, ReusableTouchable, HeightSpacer } from '../../../components';
import ReusableForm from '../../../components/reusable/ReusableForm'; 
import { Context as AuthContext } from '../../../context/AuthContext'; 

const SignUp1 = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { state, signup } = useContext(AuthContext); 

  const fields = [
    {
      label: 'Email',
      value: email,
      onChange: setEmail,
      placeholder: 'Enter your email',
    },
    {
      label: 'Password',
      value: password,
      onChange: setPassword,
      placeholder: 'Enter your password',
      secureTextEntry: true,
    }, 
  ]; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ReusableText text="Sign Up" color="black" fontSize={32} fontFamily="Arial" />
      <HeightSpacer height={15} />
      <ReusableForm
      fields={fields}
      /> 
      <HeightSpacer height={10} />
      {state.errorMessage ? <ReusableText text={state.errorMessage} color="red" /> : null} 
      <ReusableTouchable btnText="Moving on" onPress={() => signup({ email, password })}  width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" /> 
    </View> 
    </TouchableWithoutFeedback> 
  )
} 

export default SignUp1 

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
}) 