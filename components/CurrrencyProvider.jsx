import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';


const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [isDollar, setIsDollar] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState(
    AsyncStorage.getItem('authToken') || null,
  );
  console.log("BABE AU",authUser)
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decodedToken = jwtDecode(token);
      setToken(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  return (
    <CurrencyContext.Provider value={{ isDollar, setIsDollar, token, userId, setToken, setUserId}}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}