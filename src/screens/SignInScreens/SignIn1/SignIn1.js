import { StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ReusableText, HeightSpacer } from '../../../components' 
import ReusableForm from '../../../components/reusable/ReusableForm'
import { Context as AuthContext } from '../../../context/AuthContext'; 


const SignIn1 = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { signin } = useContext(AuthContext); 

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
      <ReusableText text="Sign In" color="black" fontSize={32} fontFamily="Arial" />
      <HeightSpacer height={15} /> 
      <ReusableForm
      fields={fields}
      onSubmit={() => signin({email, password})} 
      buttonText="Sign In" 
      /> 
    </SafeAreaView>
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