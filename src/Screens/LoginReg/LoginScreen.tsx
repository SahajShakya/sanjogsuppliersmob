import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
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
} from "react-native-reanimated";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from 'formik';
import LoginFormInputs from "../../components/formFields/LoginFormInput";

interface LoginScreenProps {
    setValues: () => void;
}


export default function LoginScreen() {
    const { height, width } = Dimensions.get("window");
    const imagePosition = useSharedValue(1);
    const formButtonScale = useSharedValue(1);
    const [isRegistering, setIsRegistering] = useState(false);
    const [resetVal, setResetVal] = useState<boolean>(false);

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

    const resetData = () => {
        imagePosition.value = 1
        setResetVal(!resetVal);
    }


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
        >
            <Formik
                initialValues={{ email: '', password: '', cpassword: '', firstName: '', lastName: '' }}
                //validationSchema={LoginRegValidationSchema(isRegistering)}
                onSubmit={() => {}}
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
                                <Text onPress={resetData}>X</Text>
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
                                {/* Other component here */}
                                <LoginFormInputs  isRegistering={isRegistering} formikProps={formikProps} imagePosition={imagePosition} resetVal={resetVal}  />
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
