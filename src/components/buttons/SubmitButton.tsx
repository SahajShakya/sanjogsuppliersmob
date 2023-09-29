// SubmitButton.tsx

import React from "react";
import {
    StyleSheet,
    Text,

  } from "react-native";
import { Button } from "react-native-paper";

interface SubmitButtonProps {
  onPress: () => void;
  isRegistering: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, isRegistering }) => {
  return (
    <Button
      onPress={onPress}
      style={styles.formButton}
    >
      <Text style={styles.buttonText}>
        {isRegistering ? "REGISTER" : "LOG IN"}
      </Text>
    </Button>
  );
};

export default SubmitButton;



const styles = StyleSheet.create({
    buttonText: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
      letterSpacing: 0.5
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
  });
