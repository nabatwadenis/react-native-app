import React, { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { TouchableOpacity, Text, View, SafeAreaView, Image, ActivityIndicator } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, onSnapshot } from "firebase/firestore";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";





const ChatScreen = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation();

    return(
        <View className="flex-1">
            <SafeAreaView>
                <GestureHandlerRootView className="w-full flex-column items-center justify-between px-0.2 py-7">
                    <View className="w-full flex-row items-center justify-between px-4">
                        <Image source={require("../assets/images/resellersplash.png")} className="w-12 h-12" resizeMode="contain"/>

                        <TouchableOpacity className="w-12 h-12 rounded-full border border-orange-500 flex items-center justify-center">
                            <Image source={require("../assets/images/resellersplash.png")} className="w-full h-full" resizeMode="cover"/>
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
                                ): (
                                <>
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                <MessageCard />
                                </>
                            )}
                        </View>
                    </ScrollView>
                </GestureHandlerRootView>
 
            </SafeAreaView>
        </View>
    );

};

const MessageCard = () =>{
    return (
       <TouchableOpacity className="w-full flex-row items-center justify-start py-2">
        {/* images */}
        <View className="w-16 h-16 rounded-full flex items-center border-2 border-green-300 p-1 justify-center">
            <FontAwesome5 name="users" size={24} color="#555" />
        </View>

        {/* content */}
        <View className="flex-1 flex items-start justify-center ml-4">
            <Text className="text-[#333] text-base font-semibold capitalize">
                Message Title
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
   

