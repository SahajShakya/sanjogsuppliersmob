import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from './MainScreen';
import DashBoardScreen from '../Screens/DashBoard/TabScreens/DashBoardScreen';
import ItemScreen from '../Screens/DashBoard/TabScreens/ItemScreen';
import AddScreen from '../Screens/DashBoard/TabScreens/AddScreen';
import RecordScreen from '../Screens/DashBoard/TabScreens/RecordScreen';
import CustomerScreen from '../Screens/DashBoard/TabScreens/CustomerScreen';
import LoginScreen from '../Screens/LoginReg/LoginScreen';
import DrawNavigation from './DrawNavigation';

export type RootStackParamList = {
    //SplashScreen: undefined;
    LoginScreen: undefined;
    MainScreen:undefined;
    DashboardScreen: undefined;
    ItemScreen: undefined;
    AddScreen: undefined;
    CustomerScreen: undefined;
    RecordScreen: undefined;

    };

const Stack = createStackNavigator();
// Navigator, Screen, Group

function AuthNavigation() {
  console.log(Stack);
  return (
    <Stack.Navigator screenOptions={{
            headerBackTitle: 'Back',
            headerBackTitleVisible: false,
          }}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="ForgotPassword" component={ForgotPwScreen}
              options={{
                headerShown: false,
              }}/> */}
              {/* <Stack.Screen name="ChangePassword" component={ChangePwScreen}
              options={{
                headerShown: false,
              }}/> */}
              <Stack.Screen
                  options={{
                    headerShown: false,
                  }}
                  name="MainScreen"
                  component={DrawNavigation} />

          </Stack.Navigator>
  );
}

export default AuthNavigation;