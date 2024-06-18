import { StyleSheet } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ReusableText from '../../components/reusable/ReusableText'
import { HeightSpacer, ReusableTouchable } from '../../components'
import { navigationRef } from '../../utilities/navigation/NavigationService'
import { Context as AuthContext } from '../../context/AuthContext'; 
import { Context as UserContext } from '../../context/UserContext';

const Onboarding = () => {
  const { tryLocalSignIn } = useContext(AuthContext); 
  const { state, fetchUserDataByEmail } = useContext(UserContext);

  useEffect(() => {
    if (state.email) {
      tryLocalSignIn(fetchUserDataByEmail, state.email);  
    }
  }, [state.email]);  // Depend on state.email to re-run effect when email is set 

  return (
    <SafeAreaView style={styles.container}>
      <ReusableText text="Hello this is temporary..." color="black" fontFamily="Arial" fontSize={28} /> 
      <HeightSpacer height={15} />
      <ReusableTouchable btnText="Now Sign In" onPress={() => navigationRef.navigate('AuthStack', { screen: 'SignInStack' })} textColor="white" width={200} backgroundColor="red" borderWidth={1} borderColor="red" /> 
      <HeightSpacer height={20} />
      <ReusableTouchable btnText="Now Sign Up" onPress={() => navigationRef.navigate('AuthStack', { screen: 'SignUpStack' })} textColor="white" width={200} backgroundColor="red" borderWidth={1} borderColor="red" /> 
    </SafeAreaView>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}) 