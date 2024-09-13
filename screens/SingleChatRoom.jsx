import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useCallback } from 'react'
import {Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useState, useRef } from 'react';
import { collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { io} from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';



const socket = io("http://localhost:5000")
const SingleChatRoom = ({route}) => {
  //const {room } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState ("")
  const [user, setUser] = useState("User1");

  // useEffect(() =>{
  //   socket.emit("joinRoom", room);

  //   socket.on("loadMessages", (msg) =>{
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });
  //   return () =>{
  //     socket.off("loadMessages");
  //     socket.off("newMessage");
  //   };
  // }, [room]);

  // const sendMessage =() =>{
  //   socket.emit("sendMessage", {room, user, message});
  //   setMessage("");
  // }

  
  // const user = useSelector((state) => state.user.user); //fetch current user in mongodb


  // const textInputRef = useRef(null);

  const handleKeyboardOpen = () => {
    if(textInputRef.current){
      textInputRef.current.focus();
    }

  }
  // const sendMessage = async() =>{ //send back to mongodb
  //   const timeStamp = serverTimestamp()
  //   const id = `${Date.now()}`
  //   const _doc ={
  //     _id : id,
  //     roomId: room._id,
  //     timestamp : timestamp,
  //     message, message,
  //     user : user
  //   }
  //   setMessage("")
  //   await addDoc(collection(doc(firestoreDB, "chats", room._id), "messages"), _doc)
  //   .then(() => {}).catch(err => alert(err))
  // };

  // useLayoutEffect(() => {  //change this to handle mongodb request
  //   const msgQuery = query(
  //     collection(firestoreDB, "chats", room?._id, "messages"),
  //     orderBy("timeStamp", "asc")

  //   )
  //   const unsubscribe = onSnapshot(msgQuery, (querySnap) =>{
  //     const upMsg = querySnap.docs.map(doc => doc.data())
  //     setMessage(upMsg)
  //     setIsLoading(false)

  //   })
  //   return unsubscribe;
  // }, []);
  // useEffect(()=>{
  //   io.on('initialchats', ())
  // })

  //   // const { room } = route.params;
  //   const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
  //   const [message, setMessage] = useState("")
  //   // console.log("room: ", room);

  const onSend = useCallback((messages = []) => {
    const [message] = messages;
    const newMessage = {
      _id: Math.random().toString(36).substring(7), // Generate a unique ID for the message
      text: message.text,
      createdAt: new Date(),
      user: {
        _id: 1, // Replace with actual user ID
        name: 'User Name', // Replace with actual user name
      },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessage)
    );
    setNewMessage(''); // Clear the input field
  }, []);
  return (
    <View className="flex-1">
      <View className="w-full bg-green-500 px-4 py-4 flex-[0.25]">
        <View className="flex-row items-center justify-between w-full px-4 py-12">
          {/* go back */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name='chevron-left' size={32} color={"#fbfbfb"} />
          </TouchableOpacity>

          {/* middle */}
          <View className="flex-row items-center justify-center space-x-3">
            <View className="w-12 h-12 rounded-full border border-white flex items-center justify">
              <FontAwesome5 name="users" size={24} color="#fbfbfb" />
            </View>
            <View>
              {/* room.chatName.length >16 ? `${SingleChatRoom.chatname.slice(0, 16)}..` : room.chatName */}
              <Text className="text-gray-50 text-base font-semibold capitalize">GroupName</Text>
              <Text className="text-gray-50 text-base font-semibold capitalize">Online</Text>
            </View>
          </View>

          {/* last section */}
      
          <View className="w-12 h-12 flex-row items-center justify-center space-x-3 rounded-full border border-orange-500 ">
            <Ionicons name="person-outline" size={30} className="w-full h-full" resizeMode="cover"/>
          </View>
        </View>
      </View>

      {/* bottom section */}
      <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-10">

        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding': 'height'} keyboardVerticalOffset={160}>
          <>
            <ScrollView>
              {isLoading ? (<>
                <View className="w-full flex items-center justify-center">
                  <ActivityIndicator size={"large"} color={"#43c651"} />
                </View>
              
              </>) : (
                <>
                  {/* messages */}
                </>)}
            </ScrollView>
            {/* <View className="w-full flex-row items-center justify-center px-1">
              <View className="bg-gray-200 w-full rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-between">
                <TouchableOpacity onPress={handleKeyboardOpen}>
                  <Entypo name="emoji-happy" size={24} color="#555"/>
                </TouchableOpacity>
                <TextInput className="flex-1 h-9   text-base text-gray-700 font-semibold" placeholder="Type here..." 
                placeholderTextColor={"999"}
                value={message}
                onChangeText={(text) =>setMessage(text)}/>
                <TouchableOpacity>
                  <Entypo name="mic" size={24} color="#43651"/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity className="pl-2" onPress={() => onsuspend([{text: message}])}>
                <FontAwesome name="send" size={24} color="#555"/>
              </TouchableOpacity>
            </View> */}
                    <GiftedChat messages={messages} onSend={(messages) => onSend(messages)}         
        user={{
          _id: 1, // Replace with actual user ID
          name: 'User Name', // Replace with actual user name
        }}/>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  )
}

export default SingleChatRoom