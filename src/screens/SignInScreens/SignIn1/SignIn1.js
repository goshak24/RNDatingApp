import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState, useContext } from 'react'
import { ReusableText, HeightSpacer, ReusableTouchable } from '../../../components' 
import ReusableForm from '../../../components/reusable/ReusableForm'
import { Context as AuthContext } from '../../../context/AuthContext'; 
import { Context as UserContext } from '../../../context/UserContext'; 

const SignIn1 = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { state: authState, signin } = useContext(AuthContext); 
  const { fetchUserDataByEmail } = useContext(UserContext); 

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

  const handleSignIn = () => {
    signin({ email, password }, () => {
        fetchUserDataByEmail(email); // Fetch user data after successful sign-in
    });
}; 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ReusableText text="Sign In" color="black" fontSize={32} fontFamily="Arial" />
        <HeightSpacer height={15} /> 
        <ReusableForm
          fields={fields}
          onSubmit={handleSignIn} 
          buttonText="Sign In" 
        /> 
        <ReusableTouchable btnText="Sign In" onPress={handleSignIn} width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" /> 
        {authState.errorMessage ? <ReusableText text={authState.errorMessage} color="red" /> : null} 
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