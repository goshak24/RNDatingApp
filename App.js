import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

import { navigationRef } from './src/utilities/navigation/NavigationService';
import { Provider as AuthProvider } from './src/context/AuthContext'; 

// Header Icons 
import { Ionicons } from '@expo/vector-icons'; 

// Screens
import Onboarding from './src/screens/Onboarding/Onboarding';
import SignIn1 from './src/screens/SignInScreens/SignIn1/SignIn1'; 
import SignUp1 from './src/screens/SignUpScreens/SignUp1/SignUp1';
import SignUp2 from './src/screens/SignUpScreens/SignUp2/SignUp2';
import SignUp3 from './src/screens/SignUpScreens/SignUp3/SignUp3';
import SignUp4 from './src/screens/SignUpScreens/SignUp4/SignUp4';
import SignUp5 from './src/screens/SignUpScreens/SignUp5/SignUp5';
import SignUp6 from './src/screens/SignUpScreens/SignUp6/SignUp6';
import SignUp7 from './src/screens/SignUpScreens/SignUp7/SignUp7'; 
import MainDashboard from './src/screens/MainDashboard/MainDashboard';
import PetProfile from './src/screens/PetProfile/PetProfile';
import Standouts from './src/screens/Standouts/Standouts'; 
import EditProfile from './src/screens/EditProfile/EditProfile';
import Settings from './src/screens/Settings/Settings';
import Calendar from './src/screens/Calendar/Calendar';
import Matches from './src/screens/Matches/Matches';
import MatchProfile from './src/screens/MatchProfile/MatchProfile'; 

// Stacks
const RootStack = createStackNavigator(); 
const AuthStack = createStackNavigator(); 
const SignInStack = createStackNavigator(); 
const SignUpStack = createStackNavigator(); 
const MainStack = createBottomTabNavigator(); 
const MainStackHeader = createStackNavigator(); 

const SignInStackScreen = () => {
  return (
    <SignInStack.Navigator screenOptions={{headerShown: false}}>
      <SignInStack.Screen name="SignIn1" component={SignIn1} />
    </SignInStack.Navigator>
  );
};

const SignUpStackScreen = () => {
  return (
    <SignUpStack.Navigator screenOptions={{headerShown: false}}>
      <SignUpStack.Screen name="SignUp1" component={SignUp1} />
      <SignUpStack.Screen name="SignUp2" component={SignUp2} />
      <SignUpStack.Screen name="SignUp3" component={SignUp3} />
      <SignUpStack.Screen name="SignUp4" component={SignUp4} />
      <SignUpStack.Screen name="SignUp5" component={SignUp5} />
      <SignUpStack.Screen name="SignUp6" component={SignUp6} />
      <SignUpStack.Screen name="SignUp7" component={SignUp7} />
    </SignUpStack.Navigator>
  );
};  

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SignInStack" component={SignInStackScreen} />
      <AuthStack.Screen name="SignUpStack" component={SignUpStackScreen} />
    </AuthStack.Navigator>
  );
}; 

const MainStackScreen = () => {
  return (
    <MainStack.Navigator> 
      <MainStack.Screen name="MainDashboard" component={MainDashboard} />
      <MainStack.Screen name="CalendarScreen" component={Calendar} />
      <MainStack.Screen name="Standouts" component={Standouts} />
      <MainStack.Screen name="Matches" component={Matches} />
      <MainStack.Screen name="PetProfileScreen" component={PetProfile} options={() => ({
          title: 'Profile',
          headerRight: () => (
            <Ionicons style={{ marginRight: 10 }} name="settings-outline" size={24} color="black" 
              onPress={() => navigationRef.navigate('MainStackHeader', { screen: 'Settings' })} 
              title="Settings"
            />
          ),
        })} 
      /> 
    </MainStack.Navigator> 
  )
} 

const MainStackHeaderScreen = () => {
  return (
    <MainStackHeader.Navigator>
      <MainStack.Screen name="Settings" component={Settings} />
    </MainStackHeader.Navigator>
  )
} 

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{headerShown: false}} initialRouteName="Onboarding">
        <RootStack.Screen name="Onboarding" component={Onboarding} /> 
        <RootStack.Screen name="AuthStack" component={AuthStackScreen} />
        <RootStack.Screen name="MainStack" component={MainStackScreen} />
        <RootStack.Screen name="MainStackHeader" component={MainStackHeaderScreen} /> 
      </RootStack.Navigator>
    </NavigationContainer>
  ); 
}

export default () => {
  return (
    <AuthProvider>
      <App /> 
    </AuthProvider>
  )
} 