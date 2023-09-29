import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Customer Screen</Text>
      {/* Add your customer-related content or functionality here */}
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

export default CustomerScreen;
