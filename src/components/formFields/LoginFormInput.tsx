import React, { useEffect, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import SubmitButton from "../buttons/SubmitButton";
import { RootStackParamList } from "../../Navigation/AuthNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { publicAgent } from "../../lib/Requests/AuthRequests";
import { routesName } from "../../lib/RoutesName";
import { SharedValue } from "react-native-reanimated";
import { RegistraionValidationSchema } from "../../lib/validations/RegistraionValidationSchema";
import { LoginValidationSchema } from "../../lib/validations/LoginValidationSchema";
import { AuthContext, AuthContextProps } from "../../lib/Requests/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginRegProps {
  email: string;
  password: string;
  cpassword: string;
  firstName?: string;
  lastName?: string;
}


type LoginScreenProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

interface LoginFormInputsProps {
  formikProps: any;
  isRegistering: boolean;
  imagePosition: SharedValue<number>;
  resetVal: boolean;
}

const LoginFormInputs: React.FC<LoginFormInputsProps> = ({
  formikProps,
  isRegistering,
  imagePosition,
  resetVal,
}) => {
  const navigation = useNavigation<LoginScreenProp>();
  const { setAuthState } = useContext(AuthContext) as AuthContextProps;

  useEffect(() => {
    setValues();
  },[resetVal])

  const handleSubmit = async (values: LoginRegProps) => {
    let validate;
    try {
      if(!isRegistering) {
      validate = await LoginValidationSchema().validate(values, { abortEarly: false })
      }
      else {
      validate = await RegistraionValidationSchema().validate(values, { abortEarly: false })
      }
    } catch (error: any) {
      console.log("ERROR AT LOGIN SCREEN VALIDATION", error)
      const firstError = error.inner[0].message;
      ToastAndroid.show(firstError, ToastAndroid.SHORT);
    }
    if (!isRegistering) {
      const bodyLogin = {
        email: values.email,
        password: values.password
      }
      try {
        const response = await publicAgent.post(routesName.AuthRoute({}).login, bodyLogin);
        if (response && response?.data?.status===200  && response?.data) {
          const accessToken = response.data.result.token;
          const refreshToken = response.data.result.refresh.token;
          const userId = response.data.result.id;
          const email = response.data.result.email;

          setAuthState({
            accessToken: accessToken,
            refreshToken: refreshToken,
            authenticated: true
          })

          try {
            await AsyncStorage.setItem('userId', `${userId}`)
            await AsyncStorage.setItem('accessToken', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
          } catch (error) {
            console.error('Error saving token to AsyncStorage:', error);
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'MainScreen' }],
          });

        }
      } catch (error:any) {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
        } else if (error.request) {
          ToastAndroid.show("Network error. Please check your connection.", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("An unknown error occurred.", ToastAndroid.SHORT);
        }
      }

    }
    else {
      const bodyRegistraion = {
        email: values.email,
        password: values.password,
        cpassword: values.cpassword,
        firstName: values.firstName,
        lastName: values.lastName,
      }
      try {
        const response = await publicAgent.post(routesName.AuthRoute({}).register, bodyRegistraion);
        const success = response.data;
        if (response && response?.data.status === 201  && response?.data) {
          const success = response.data.result;
          ToastAndroid.show(success, ToastAndroid.SHORT);
          imagePosition.value = 1;
          setValues();
        }
      } catch (error: any) {
        if (error.response) {
          ToastAndroid.show(error.response.data.error, ToastAndroid.SHORT);
        } else if (error.request) {
          ToastAndroid.show("Network error. Please check your connection.", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("An unknown error occurred.", ToastAndroid.SHORT);
        }
      }

    }
  };

  const setValues = () => {
    formikProps.setFieldValue('email', '');
    formikProps.setFieldValue('password', '');
    formikProps.setFieldValue('cpassword', '');
    formikProps.setFieldValue('firstName', '');
    formikProps.setFieldValue('lastName', '');
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        style={styles.textInput}
        onChangeText={formikProps.handleChange('email')}
        onBlur={formikProps.handleBlur('email')}
        value={formikProps.values.email}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="black"
        style={styles.textInput}
        onChangeText={formikProps.handleChange('password')}
        onBlur={formikProps.handleBlur('password')}
        value={formikProps.values.password}
        secureTextEntry
      />
      {isRegistering && (
        <View>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="black"
            style={styles.textInput}
            onChangeText={formikProps.handleChange('cpassword')}
            onBlur={formikProps.handleBlur('cpassword')}
            value={formikProps.values.cpassword}
            secureTextEntry
          />
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="black"
              style={[styles.textInput, { flex: 0.5, width: "100%" }]}
              onChangeText={formikProps.handleChange('firstName')}
              onBlur={formikProps.handleBlur('firstName')}
              value={formikProps.values.firstName}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="black"
              style={[styles.textInput, { flex: 0.5, width: "100%" }]}
              onChangeText={formikProps.handleChange('lastName')}
              onBlur={formikProps.handleBlur('lastName')}
              value={formikProps.values.lastName}
            />
          </View>
          {/* <LoginScreen setValues={setValues} /> */}
        </View>
      )}
      <SubmitButton
        onPress={() => {
          handleSubmit(formikProps.values);
        }}
        isRegistering={isRegistering}
      />
    </View>
  );
};

export default LoginFormInputs;

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown',
  },
});
