import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { ReusableText, ReusableTouchable, HeightSpacer, ReusableModal } from '../../../components';
import ReusableForm from '../../../components/reusable/ReusableForm'; 
import { navigationRef } from '../../../utilities/navigation/NavigationService';

const SignUp2 = ({ route }) => {
  const { email } = route.params; 
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Choose Pet Type');
  const [breedType, setBreedType] = useState(''); 
  const [petAge, setPetAge] = useState('');  
  const [errors, setErrors] = useState('');

  const typeOptions = ["Cat", "Dog", "Rabbit", "Guinea Pig"];

  const fields = [
    {
      label: "Pet Name",
      value: petName,
      onChange: setPetName,
      placeholder: "Enter your pet's name",
    },
    {
      label: "Pet Breed",
      value: breedType,
      onChange: setBreedType,
      placeholder: "Enter pet breed",
    }, 
    {
      label: "Pet Age",
      value: petAge,
      onChange: setPetAge,
      placeholder: "Enter pet age",   
    }
  ];

  const handleTypeSelect = (type) => {
    setPetType(type);
  }; 

  // Dont pass parameters into this function or their null states will be passed in on the first render
  // And will not update when their values are overwritten with actual results from the user 
  const handleSubmit = () => {
    if (!email || !petName || !petType || !breedType || !petAge) {
      setErrors("Not all information is entered");  
    } else {
      navigationRef.navigate('SignUp3', { email, petName, petType, breedType, petAge }); 
    }
  } 

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <ReusableForm fields={[fields[0]]} />
      <HeightSpacer height={10} />
      <ReusableModal modalText={petType} optionsList={typeOptions} onSelect={handleTypeSelect} />
      <HeightSpacer height={10} />
      <ReusableForm fields={[fields[1], fields[2]]} />
      <ReusableTouchable btnText="Moving on" onPress={handleSubmit} width={200} textColor="white" backgroundColor="red" borderWidth={1} borderColor="red" /> 
      {errors ? <ReusableText text={errors} color="red" /> : null} 
    </View>
    </TouchableWithoutFeedback> 
  );
};

export default SignUp2

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }
}) 