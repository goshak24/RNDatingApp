import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import { ReusableText, HeightSpacer, ReusableTouchable } from '../../../components' 
import ReusableForm from '../../../components/reusable/ReusableForm'
import { Context as AuthContext } from '../../../context/AuthContext'; 


const SignIn1 = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const { state, signin } = useContext(AuthContext); 

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
      <ReusableText text="Sign In" color="black" fontSize={32} fontFamily="Arial" />
      <HeightSpacer height={15} /> 
      <ReusableForm
      fields={fields}
      onSubmit={() => signin({email, password})} 
      buttonText="Sign In" 
      /> 
      <ReusableTouchable btnText="Sign In" onPress={() => signin({ email, password })}  width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" /> 
      {state.errorMessage ? <ReusableText text={state.errorMessage} color="red" /> : null} 
    </View>
    </TouchableWithoutFeedback>   
  )
}

export default SignIn1

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}) 