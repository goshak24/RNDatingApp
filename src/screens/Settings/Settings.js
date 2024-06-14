import { StyleSheet, View } from 'react-native'
import { ReusableTouchable } from '../../components'
import React, { useContext } from 'react'
import { Context as AuthContext } from '../../context/AuthContext'; 

const Settings = () => { 
  const { signout } = useContext(AuthContext); 

  return (
    <View style={styles.container}>
      <ReusableTouchable onPress={signout} btnText="Sign Out" textColor="white" width={200} backgroundColor="red" />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
}) 