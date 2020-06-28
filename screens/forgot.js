import React,{useState} from 'react';
import { Alert, View, Text,Button,TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { globalStyles } from '../styles/global';
import * as firebase from "firebase";

export default function About({ navigation }) {

const [mail,setmail]= useState("");
const [send,setsend]=useState(false);
async function forget() {
    
  try {
      
     await firebase.auth().sendPasswordResetEmail(mail)
      console.log("sended");
      setsend(true);
      // Navigate to the Home page

  } catch (error) {
      console.log(error.toString())
      Alert.alert(error.message);
  }

}


  
    if(send){
      return (
    <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
    <View style={globalStyles.modalContainer}>
    <View style={{paddingTop:10}} />
      <TextInput style={  {width:200 , height:40 , borderWidth: 1,} }
        placeholder='email' 
        keyboardType='email-address'
        autoCapitalize="none"
        onChangeText={ (text)=>{setmail(text)} } />

<View style={{paddingTop:10}} />
<Text> password was sent , follow instrctios ...  </Text>
      <Button  title={"send reset email"}  onPress={forget} />
      <View style={{paddingTop:50}} />
      <Button  title={"signup"} color="red" onPress={() => navigation.navigate('ReviewDetails')} />
      <View style={{paddingTop:10}} />
      <Button  title={"login"}  color="green" onPress={() => navigation.navigate('Home')} />    


    </View>
    </TouchableWithoutFeedback>
      );
    }
     else{
      return (
        <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
        <View style={globalStyles.modalContainer}>
        <Text> forgot password </Text>
        <View style={{paddingTop:10}} />
          <TextInput style={  {width:200 , height:40 , borderWidth: 1,} }
            placeholder='email' 
            keyboardType='email-address'
            autoCapitalize="none"
            onChangeText={ (text)=>{setmail(text)} } />
    
    <View style={{paddingTop:10}} />
    
          <Button  title={"send reset email"}  onPress={forget} />
          <View style={{paddingTop:50}} />
          <Button  title={"signup"} color="red" onPress={() => navigation.navigate('ReviewDetails')} />
          <View style={{paddingTop:10}} />
          <Button  title={"login"}  color="green" onPress={() => navigation.navigate('Home')} />    
    
    
        </View>
        </TouchableWithoutFeedback>
          );

     }
}
