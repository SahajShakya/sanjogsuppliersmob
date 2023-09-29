import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  Image as Img,
} from "react-native";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { LoginRegValidationSchema } from "../../lib/validations/LoginValidationSchema";
import { Button } from "react-native-paper";
import { ToastAndroid } from 'react-native';
import { navigate } from "../../RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/AuthNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext, AuthContextProps } from "../../lib/Requests/AuthContext";
import { UserContext, UserContextType } from "../../lib/context/UserContext";
import { privateAgent, publicAgent } from "../../lib/Requests/AuthRequests";
import { routesName } from "../../lib/RoutesName";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginRegProps {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

type LoginScreenProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen() {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigation = useNavigation<LoginScreenProp>();


  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-(height + 200) / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const animateImage = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [0, width]
    );
    return {
      transform: [
        { translateX: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
      zIndex: imagePosition.value === 0 ? 1 : -1,
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }]
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  const handleSubmit = async (values: LoginRegProps) => {
    let validate;
    // const test = await publicAgent.get ( routesName.TestRoute().test);
    // console.log(test.data?.message);
    try {
      validate = await LoginRegValidationSchema(isRegistering).validate(values, { abortEarly: false })
    } catch (error: any) {
      const firstError = error.inner[0].message;
      ToastAndroid.show(firstError, ToastAndroid.SHORT);
    }
    if (validate) {
      try {

        if (!isRegistering) {
          const body = {
            email: values.email,
            password: values.password
          }
          console.log(body)
          const response = await publicAgent.post(routesName.AuthRoute({}).login, body);
          console.log("Response ", response)
          // navigation.reset({
          //   index: 0,
          //   routes: [{ name: 'MainScreen' }],
          // });
        }
        else {
          const body = {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          }
          console.log(body)
          const response = await publicAgent.post(routesName.AuthRoute({}).register, body);
          const success = response.data;
        //console.log(success);

          if (response && response?.data.status === 201 && response && response?.data) {
            const success = response.data.result;
            ToastAndroid.show(success, ToastAndroid.SHORT);

            imagePosition.value = 1

            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'LoginScreen' }],
            // });
          }
        }
      } catch (error) {
        ToastAndroid.show("Email Already exist", ToastAndroid.SHORT);
      }
    }


    // if(!isRegistering) {
    //   if(validate) {
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'MainScreen' }],
    // });
    //   }
    // }
    // else {
    //   if(validate) {
    //     navigation.reset({
    //       index: 0,
    //       routes: [{ name: 'LoginScreen' }],
    //     });
    //   }
    // }
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
    >
      <Formik
        initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
        //validationSchema={LoginRegValidationSchema(isRegistering)}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Animated.View style={styles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
              <Svg height={height + 100} width={width}>
                <ClipPath id="clipPathId">
                  <Ellipse cx={width / 2} rx={height} ry={height + 100} />
                </ClipPath>
                <Image
                  href={require("../../../assets/icecreamBackground.jpeg")}
                  width={width + 100}
                  height={height + 100}
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#clipPathId)"
                />
              </Svg>
              <Animated.View
                style={[styles.closeButtonContainer, closeButtonContainerStyle]}
              >
                <Text onPress={() => (imagePosition.value = 1)}>X</Text>
              </Animated.View>
            </Animated.View>
            <View style={[styles.bottomContainer, { height: height / 3 }]}>
              <Animated.View style={buttonsAnimatedStyle}>
                <Pressable style={styles.button} onPress={loginHandler}>
                  <Text style={styles.buttonText}>LOG IN</Text>
                </Pressable>
              </Animated.View>
              <Animated.View style={buttonsAnimatedStyle}>
                <Pressable style={styles.button} onPress={registerHandler}>
                  <Text style={styles.buttonText}>REGISTER</Text>
                </Pressable>
              </Animated.View>
              <Animated.View style={[styles.formInputContainer, StyleSheet.absoluteFill, formAnimatedStyle]}>
                <Animated.View style={animateImage}>
                  <Img source={require('../../../assets/icecream.png')}
                    style={styles.backgroundImage}
                  />
                </Animated.View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  value={formikProps.values.email}
                />
                {isRegistering && (
                  <View>
                    <TextInput
                      placeholder="First Name"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      onChangeText={formikProps.handleChange('firstName')}
                      onBlur={formikProps.handleBlur('firstName')}
                      value={formikProps.values.firstName}
                    />
                    <TextInput
                      placeholder="Last Name"
                      placeholderTextColor="black"
                      style={styles.textInput}
                      onChangeText={formikProps.handleChange('lastName')}
                      onBlur={formikProps.handleBlur('lastName')}
                      value={formikProps.values.lastName}
                    />
                  </View>
                )}
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="black"
                  style={styles.textInput}
                  onChangeText={formikProps.handleChange('password')}
                  onBlur={formikProps.handleBlur('password')}
                  value={formikProps.values.password}
                  secureTextEntry
                />
                <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
                  {/* <Pressable onPress={() => {

                    formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));

                    formikProps.handleSubmit();
                  }}>
                    <Text style={styles.buttonText}>
                      {isRegistering ? "REGISTER" : "LOG IN"}
                    </Text>
                  </Pressable> */}
                  <Button
                    onPress={() => {
                      formButtonScale.value = withSequence(withSpring(1.5), withSpring(1));
                      formikProps.handleSubmit();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {isRegistering ? "REGISTER" : "LOG IN"}
                    </Text>
                  </Button>

                </Animated.View>
              </Animated.View>
            </View>
          </Animated.View>
        )}

      </Formik>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: 'transparent',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 0.5
  },
  bottomContainer: {
    justifyContent: 'center',
    top: -20
  },
  backgroundImage: {
    position: 'absolute',
    top: -30,
    left: 0,
    width: '100%',
    height: 300,
    zIndex: -5,
    objectFit: 'contain',
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10
  },
  formButton: {
    backgroundColor: 'grey',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
    zIndex: -1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 40,
    width: 80,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 20,
    top: -20
  }
});
