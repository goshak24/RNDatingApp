import { StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReusableText, HeightSpacer } from '../../../components';
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
    <SafeAreaView style={styles.container}>
      <ReusableText text="Sign Up" color="black" fontSize={32} fontFamily="Arial" />
      <HeightSpacer height={15} />
      <ReusableForm
      fields={fields}
      onSubmit={() => signup({ email, password })} 
      buttonText="Moving on" 
      /> 
      <HeightSpacer height={15} />
      {state.errorMessage ? <ReusableText text={state.errorMessage} color="red" /> : null} 
    </SafeAreaView> 
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