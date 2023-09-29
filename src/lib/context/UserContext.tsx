import React, { createContext, useState, FC, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserData {
    email: string;
    id: string;
    firstName: string;
    lastName: string;
}
export interface UserContextType {
    user: UserData | null;
    updateUser: (userData: UserData) => void;


}

const UserContext = createContext<UserContextType | null>(null);
const { Provider } = UserContext;

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {

    const [user, setUser] = useState<UserData | null>({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const firstName = await AsyncStorage.getItem('firstName');
                const lastName = await AsyncStorage.getItem('lastName');
                const email = await AsyncStorage.getItem('email');
                const id = await AsyncStorage.getItem('userId');
                const accessToken = await AsyncStorage.getItem('firstName');
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (email && id && firstName && lastName && accessToken && refreshToken) {
                    setUser({ email: email, firstName: firstName, lastName: lastName, id: id });
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUserData();
    }, []);

    const updateUser = async (userData: UserData) => {
        //console.log("USERDATA IN CONTEXT", userData)
        setUser((prevState) => ({
            ...prevState,
            id: userData.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
        }));
        await AsyncStorage.setItem('firstName', userData.firstName);
        await AsyncStorage.setItem('lastName', userData.firstName);
        await AsyncStorage.setItem('email', userData.email);
        await AsyncStorage.setItem('userId', String(userData.id));
    };

    return (
        <Provider
            value={{
                user,
                updateUser,
            }}
        >
            {children}
        </Provider>
    );
};

export { UserContext, UserProvider };
