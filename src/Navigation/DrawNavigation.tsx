import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import ItemScreen from '../Screens/DashBoard/TabScreens/ItemScreen';
import MainScreen from './MainScreen';
import CustomDrawer from '../components/customComponents/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

type DrawerNavigationParamList = {
    MainScreen: undefined;
};


export default function DrawNavigation() {
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: {
                    marginLeft: 20,
                },
            }}>
            <Drawer.Screen
                name="MainDrawScreen"
                component={MainScreen}
                options={{
                    title: 'MainScreen',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons  name={focused ? "ios-home-sharp" : "ios-home-outline"} size={18} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="ItemScreen"
                component={ItemScreen}
                options={{
                    title: 'ItemScreen',
                    drawerIcon: ({ focused, color, size }) => (
                        <Ionicons name={focused ?  'ios-list-sharp' : 'ios-list-outline'} size={18} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}