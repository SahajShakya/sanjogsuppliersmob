import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Screen</Text>
      {/* Add your add item form or functionality here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddScreen;
