import React, { useState ,useEffect} from 'react';
import { StyleSheet, View, Text, TextInput,Button,TouchableOpacity,Keyboard,FlatList, Alert, ActivityIndicator, RefreshControl} from 'react-native';
import { globalStyles } from '../styles/global';
import * as firebase from "firebase";
import 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import AddTodo from './addTodo';

export default function todo({ navigation }) {
  const [todos, setTodos] = useState([])
  const [load, setload] = useState(true)
  const db = firebase.firestore();
  const usersRef = db.collection('todo').doc(firebase.auth().currentUser.uid)

  useEffect(()=>{
    if(load==false){usersRef.set({name:todos})}
  },[todos.length])
  useEffect(() => data(), []);

  async function data() {
    try {
      await usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          usersRef.onSnapshot((doc) => {
            // do stuff with the data
           setTodos(doc.data().name); 
          });
        } else {
          console.log("creat empty")
          usersRef.set({name:[]})  // create the document
        }
    });
    setload(false);
    } catch (error) {
      console.log(error);
    }
  }
 
 const pressHandler = (key) => {//--------------Delete todo
  setTodos(prevTodos => {
    return prevTodos.filter(todo => todo.key != key);
  });
};

const submitHandler = (text) => {//----------------------------- add todo
  if(text.length > 3){
    setTodos(prevTodos => {
      return [
        { text, key: Math.random().toString() },
        ...prevTodos
      ];
    });
  } else {
    Alert.alert('OOPS', 'Todo must be over 3 characters long', [
      {text: 'Understood', onPress: () => console.log('alert closed') }
    ]);
  } 
};

function MakeChange(key,text){
  var temp = [...todos];
  for(var i = 0 ;i<todos.length ; i++ ){
    if(temp[i].key==key){
      temp[i].text=text;
    }
  }
  setTodos(temp);
}


if(load ){
    return(
      <View style={styles.containerr}>
      <ActivityIndicator/>
      </View>
    );
}
else{
    return (
 /* <TouchableWithoutFeedback onPress={() => {
    Keyboard.dismiss();
    console.log('dismissed');
  }}>*/
      
    <View style={styles.container}>
      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (              
           <View style={styles.item}>        
           <MaterialIcons name='delete' size={18} color='#333' onPress={() => pressHandler(item.key)} />
           <TouchableOpacity  onPress={() => navigation.navigate('change',{title: item.text,
                                                                            ky:item.key,
                                                                            MakeChange:MakeChange})}>
           <Text style={styles.itemText}>{item.text}</Text> 
           </TouchableOpacity>
           </View>
            )}
          />
        </View>
        <View style={{paddingTop:10}} />
      <Button  title={"log out!"}  onPress={()=> {firebase.auth().signOut()} } />
      </View>
    </View>
  //</TouchableWithoutFeedback>
            );
            }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
content: {
  padding: 40,
  flex: 1,
},
list: {
  marginTop: 20,
  flex: 1,
},
item: {
  padding: 5,
  marginTop: 5,
  borderColor: '#bbb',
  borderWidth: 1,
  borderStyle: "dashed",
  borderRadius: 1,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
},
itemText: {
  marginLeft: 20,
  marginRight: 20,
},
containerr: {
  flex: 1,
  padding:100 ,
  backgroundColor: "#fff",
  alignItems: "center",
  justifyContent: "flex-start"
},
});
