import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { doc, setDoc } from 'firebase/firestore'

const AdToChatScreen = () => {
  const navigation = useNavigation();
  const [addChat, setAddChat] = useState("");
  //const user =useSelector((state) => state.user.user)
  const createNewChat = async () =>{
    let id = `${Date.now}`

    const _doc ={
      _id : id,
      //user: user,
      chatName: addChat
    }

    if( chatName !== ""){
      setDoc(doc(firestoreDB, "chats", id), _doc).then(() =>{
        setAddChat("")
        navigation.replace("ChatScreen")
      }).catch((err) =>{
        alert("Error: ", err)
      } )
    }
  }
  return (
    <View className="flex-1">
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-5">
        <View className='w-full px-4 py-4'>
          <View className="w-full flex-row items-center justify-between py-3 rounded-xl border border-orange-300 space-x-3">
            {/* icon */}
            <Ionicons name='chatbubbles' size={24} color={"#777"}/>


            {/* textinput */}
            <TextInput className="flex-1 txt-lg -mt-2 h-12 w-full" 
            placeholder='create a chatroom'
            placeholderTextColor={"#999"}
            value={addChat}
            onChangeText={(text)=> setAddChat(text)} />

            {/* icon */}
            <TouchableOpacity onPress={"createNewChat"}>
              <FontAwesome name='send' size={24} color={"#777"}/>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      
    </View>
  )
}

export default AdToChatScreen