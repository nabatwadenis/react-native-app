import { SafeAreaView, StyleSheet, Text, View,Image,Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { TextInput } from "react-native-gesture-handler";
import { CurrencyProvider } from "../components/CurrrencyProvider";
import User from "../components/User";

const ProfileScreen = () => {
  const [useremail, setUseremail] = useState("");
  const [loggeduser, setLoggeduser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([ ]);
  const {token, userId} = useContext(CurrencyProvider);


  const fetchUsers = async () =>{
    try {
      const response = await fetch(`https://res-server-sigma.vercel.app/api/user/usersdata/${userId}`);
      const data = await response.json();
      setUsers(data);
    } catch(error){
      console.log(error)
    }
  };
  useEffect(() => {
    fetchUsers();
  }, [])

  //cont get useremail
  const getUseremail = async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      setUseremail(email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUseremail();
  }, []);

  //collect user data
  const getUserdata = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://res-server-sigma.vercel.app/api/user/usersdata/${useremail}`
      );
      const userdata = response.data[0];
      setLoggeduser(userdata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);
  return (
    <SafeAreaView className="flex-1">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-semibold text-xl">
            Loading user info....
          </Text>
        </View>
      ) : (
        <View className="bg-white items-center h-full flex-1">
          <View className="justify-center items-center py-12">
            <Image
              source={require("../assets/images/resellersplash.png")}
              className="h-32 w-32 rounded-full border border-orange-500 border-2xl"
            />
          </View>
          <Ionicons name="person-outline" size={30} className="w-full h-full" resizeMode="cover"/>
          <View>
          </View>
          <Text className="text-2xl font-semibold text-slate-600">{loggeduser.firstName + " " + loggeduser.lastName}</Text>
          <Text style={{textAlign:"center", fontSize:15, fontWeight:"500"}}>Logged in users</Text>
        </View>
      )}
      <Flatlist data={users} renderItem={({item}) =>(
        <User item={item} key={item?._id}/>
      )}></Flatlist>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
