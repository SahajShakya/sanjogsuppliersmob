import React, { useEffect, useContext, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './AuthNavigation';
import ItemScreen from '../Screens/DashBoard/TabScreens/ItemScreen';
import AddScreen from '../Screens/DashBoard/TabScreens/AddScreen';
import CustomerScreen from '../Screens/DashBoard/TabScreens/CustomerScreen';
import RecordScreen from '../Screens/DashBoard/TabScreens/RecordScreen';
import DashBoardScreen from '../Screens/DashBoard/TabScreens/DashBoardScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Topbar from '../components/customComponents/Topbar';

const Tab = createBottomTabNavigator();

type MainScreenProp = StackNavigationProp<
    RootStackParamList,
    'MainScreen'
>;

export default function MainScreen({ }) {

    const navigation = useNavigation<MainScreenProp>();


    return (
        <>
        <View style={{ marginTop: 20 }}>
          <Topbar />
        </View>
            <Tab.Navigator

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size, focused }) => {
                      let iconName;

                      if (route.name === 'DashboardScreen') {
                        iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                      } else if (route.name === 'ItemScreen') {
                        iconName = focused ? 'ios-list-sharp' : 'ios-list-outline';
                      }else if (route.name === 'AddScreen') {
                        iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
                      } else if (route.name === 'CustomerScreen') {
                        iconName = focused ? 'ios-people' : 'ios-people-outline';
                      }
                      else {
                        iconName = focused ? 'ios-document' : 'ios-document-outline';;
                      }
                      return <Ionicons name={iconName} size={size} color={color} />;
                    },
                  })}
            >
                <Tab.Screen name="DashboardScreen" component={DashBoardScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="ItemScreen" component={ItemScreen}  options={{ headerShown: false }} />
                <Tab.Screen name="AddScreen" component={AddScreen} options={{ headerShown: false }} />
                <Tab.Screen name="CustomerScreen" component={CustomerScreen} options={{ headerShown: false }}/>
                <Tab.Screen name="RecordScreen" component={RecordScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
        paddingHorizontal: 10,
    },
});
