import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecordScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Record Screen</Text>
      {/* Add your record-related content or functionality here */}
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

export default RecordScreen;
