import React,{useState} from 'react';
import { StyleSheet, View, Text ,Button,TextInput,Alert,TouchableWithoutFeedback,Keyboard} from 'react-native';
import { globalStyles } from '../styles/global';
import * as firebase from "firebase";

export default function ReviewDetails({ navigation }) {
  const [mail,setmail]= useState("");
  const [pass,setpass]= useState("");
  const [pass2,setpass2]= useState("");


  async function signup() {
  
        if(pass!== pass2){
                console.log("no");
                Alert.alert("the two password are not th same");
                return;
        }
        try {
            await firebase.auth().createUserWithEmailAndPassword(mail, pass); 
            console.log("Account created");
            navigation.navigate('todo',{mail:mail});
            setmail("");
            setpass("");
            setpass2("");
            // Navigate to the Home page, the user is auto logged in
        } catch (error) {
            console.log(error.toString())
            Alert.alert(error.message);
        }
    
    }


  return (
    <TouchableWithoutFeedback onPress={()=> {console.log("hi"); Keyboard.dismiss()}}>
    <View style={globalStyles.modalContainer}>
    <View style={{paddingTop:10}} />    
        <TextInput style={  {width:200 , height:40 , borderWidth: 1,} }
         value={mail}
        placeholder='email' 
        keyboardType='email-address'
        autoCapitalize="none"
        onChangeText={ (text)=>{setmail(text)} } />

        <View style={{paddingTop:10}} />

        <TextInput style={ {width:200 , height:40 , borderWidth: 1} }
         value={pass}
        placeholder='password'
        secureTextEntry={true} 
        onChangeText={(text)=>{setpass(text)} } />

        <View style={{paddingTop:10}} />

        <TextInput style={ {width:200 , height:40 , borderWidth: 1} }
        value={pass2}
        placeholder='confirmpassword' 
        secureTextEntry={true}
        onChangeText={(text)=>{setpass2(text)} } />

        <View style={{paddingTop:10}} />


          <Button  title={"signup"}  onPress={ signup } />
          <View style={{paddingTop:50}} />
          <Button  title={"login"}  color="red" onPress={() => navigation.navigate('Home')} />
          <View style={{paddingTop:10}} />
          <Button  title={"forget password"}  color="green" onPress={() => navigation.navigate('about')} />

    </View>
    </TouchableWithoutFeedback>
  );
}