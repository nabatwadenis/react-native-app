import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { TouchableOpacity, Text, View, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, onSnapshot, query } from "firebase/firestore";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { io } from "socket.io-client";




const socket = io("http://localhost:5000")
const ChatScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [chatrooms, setChatrooms] = useState(null);

    const navigation = useNavigation();
    
    const fetchChatrooms = async() =>{
        try{
            const response = await fetch("http://localhost:5000/allrooms");
            const data = await response.json();
            setChatrooms(data); 
        } catch(error){
            console.error("Error fetching chatrooms:", error);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(()=> {
        fetchChatrooms();
        socket.on("roomCreated", (room) => {
            setChatrooms((prevRooms) => [room, ...prevRooms]);
        });
        return () => {
            socket.off("roomCreated");
        };
    }, []);
    // useLayoutEffect(() => {
    //     const chatQuery = query(
    //         collection(firestore, "chats"),
    //         orderBy("_id", "desc")
    //     );
    //     const unsubscribe = onSnapshot(chatQuery, (querySnapShot) =>{
    //         const chatRooms = querySnapShot.docs.map(doc => doc.data())
    //         setChats(chatRooms)
    //         setIsLoading(false)
    //     })
    //     //to stop listening to updates  
    //     return unsubscribe
    // }, []);



    return(
        <View className="flex-1">
            <SafeAreaView>
                <GestureHandlerRootView className="w-full flex-column items-center justify-between px-0.7 py-9">
                    <View className="w-full flex-row items-center justify-between px-5">
                        <Image source={require("../assets/images/resellersplash.png")} size={30} className="w-12 h-12" resizeMode="contain"/>

                        <TouchableOpacity className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center"onPress={() => navigation.navigate("Profile")}>
                            <Ionicons name="person-outline" size={30} className="w-full h-full" resizeMode="cover"/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="w-full px-4 pt-4">
                        <View className="w-full">
                            <View className="w-full flex-row items-center justify-between px-2">
                                <Text className="text-primaryText text-base font-extrabold pb-2">
                                    Messages
                                </Text>
                                <TouchableOpacity onPress={() => navigation.navigate("AdToChatScreen")}>
                                    <Ionicons name="chatbox" size={28} color="#555"/>
                                </TouchableOpacity>
                            </View>

                            {isLoading ? (
                                <>
                                    <View className= "w-full flex items-center justify-center">
                                        <ActivityIndicator size={"large"} color={"#43c651"} />
                                    </View>
                                </>
                                ):(
                                <>
                                    {chatrooms && chatrooms?.length > 0 ? (<>
                                    {chatrooms?.map((room) => (
                                        <MessageCard key={room._id} room={room} />
                                    ))}
                                    </>) : (<>
                                        <Text>No chatrooms Available</Text>
                                    </>)}
                                </>
                            )}
                        </View>
                    </ScrollView>
                </GestureHandlerRootView>
 
            </SafeAreaView>
        </View>
    );

};

const MessageCard = ({room}) =>{
    const navigation = useNavigation();
    return (
       <TouchableOpacity onPress={() =>navigation.navigate("SingleChatRoom", {room : room})} className="w-full flex-row items-center justify-start py-2">
        {/* images */}
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-green-300 p-1 justify-center">
            <FontAwesome5 name="users" size={24} color="#555" />
        </View>

        {/* content */}
        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-[#333] text-base font-semibold capitalize">
                {room.chatName}
            </Text>
            <Text className="text=primaryText text-sm">
                Lorem ipsum dolor 
                sit amet elit.....
            </Text>
        </View>

        {/* time-text */}
        <Text className="text-primary px-4 text-base font-semibold">27 min</Text>

       </TouchableOpacity>
    )
}


export default ChatScreen;
   

