import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { doc, setDoc } from 'firebase/firestore'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { io } from 'socket.io-client'


const socket = io("http://localhost:5000")

const AdToChatScreen = () => {
  const navigation = useNavigation();
  //const [newRoom, setNewRoom] = useState("");
  const [ addChat, setAddChat] = useState("");
  //const user =useSelector((state) => state.user.user)
  // const createNewChat = async () =>{
  //   let id = `${Date.now}`

  //   const _doc ={
  //     _id : id,
  //     //user: user,
  //     chatName: addChat
  //   }

  //   if( chatName !== ""){
  //     setDoc(doc(firestoreDB, "chats", id), _doc).then(() =>{
  //       setAddChat("")
  //       navigation.replace("ChatScreen")
  //     }).catch((err) =>{
  //       alert("Error: ", err)
  //     } )
  //   }


  // const handleCreateRoom =() =>{
  //   if (newRoom.trim()) {
  //     socket.emit('createRoom', newRoom.trim());
  //     setNewRoom('');
  //     navigation.goBack();
  //   }
  // }
  const handleCreateRoom = async () => {
    if (newRoom.trim()) {
      try {
        // Make a POST request to create a new room
        const response = await fetch('http://localhost:5000/createChatroom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newRoom.trim() }),
        });
  
        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        // Parse the JSON response
        const newRoomData = await response.json();
  
        // Optionally, you can use Socket.IO to notify other clients or perform other actions
        // socket.emit('createRoom', newRoom.trim());
  
        // Clear the input field
        setNewRoom('');
  
        // Optionally navigate to another page or update the UI
        navigation.goBack();
      } catch (error) {
        console.error('Error creating room:', error);
        // Handle the error appropriately, e.g., show an error message to the user
      }
    } else {
      // Optionally handle the case where the input is empty
      console.error('Room name is required.');
    }
  };


  return (
    <View className="flex-1">
      <View className="w-full bg-orange-700 px-4 py-4 flex-[0.25]">
        <View className="w-full flex-row items-center justify-between px-4 py-12">
          {/* go back */}
          <TouchableOpacity onPress={() => navigation.navigate("SingleChatRoom")}>
            <MaterialIcons name='chevron-left' size={32} color={"#fbfbfb"} />
          </TouchableOpacity>

          {/* middle */}

          {/* last section */}
      
          <View className="w-12 h-12 flex-row items-center justify-center space-x-3 rounded-full border border-green-500 ">
            <Ionicons name="person-outline" size={30} className="w-full h-full" resizeMode="cover"/>
          </View>
        </View>
      </View>

      {/* bottom section */}
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">
        <View className="w-full px-4 py-4">
          <View clasName="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-orange-500 space-x-3">
            <Ionicons name="chatbubbles" size={24} color={"#777"}/>
            <TextInput clasName="flex-1 text-lg -mt-2 h-12 w-full" placeholder='create a chatroom' placeholderTextColor={"#999"} 
              value={addChat} onChangeText={(text) => setAddChat(text)}
            />
            {/* onPress={createNewChat} insert here */}
            {/* onPress={handleCreateRoom} */}
            <TouchableOpacity onPress={() =>navigation.navigate("SingleChatRoom")}>
              <FontAwesome name="send" size={24} color={"#777"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default AdToChatScreen