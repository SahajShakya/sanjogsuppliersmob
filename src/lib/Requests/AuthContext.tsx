import React, { createContext, useState, FC, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { UserContext, UserContextType, UserData } from '../context/UserContext';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
}


export interface AuthContextProps {
  authState: AuthState;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAuthState: (state: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const { Provider } = AuthContext;

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {

  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  useEffect(() => {
    isLoginIn();
  }, []);

  const isLoginIn = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');

      if (accessToken && refreshToken) {
        setAuthState((prevState) => ({
          ...prevState,
          accessToken,
          refreshToken,
          authenticated: true,
        }));
      }
    } catch (error) {
      console.error('Error fetching tokens from AsyncStorage:', error);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });

    const userData : UserData={
      id: "",
      email: "",
      firstName: "",
      lastName: "",
    }

 
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  const getRefreshToken = () => {
    return authState.refreshToken;
  };

  return (
    <Provider
      value={{
        authState,
        getAccessToken,
        getRefreshToken,
        setAuthState,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };