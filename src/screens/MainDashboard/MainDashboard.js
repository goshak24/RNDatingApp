import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context as UserContext } from '../../context/UserContext'; 

const MainDashboard = () => {
  const { state } = useContext(UserContext); 
  console.log(state); 

  return (
    <View>
      <Text>{state.userId}</Text> 
    </View>
  )
}

export default MainDashboard

const styles = StyleSheet.create({})