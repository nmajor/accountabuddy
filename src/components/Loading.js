import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
// import { Actions, ActionConst } from 'react-native-router-flux';

const styles = {
  containerStyles: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingBottom: 200,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 26,
    paddingBottom: 30,
  },
};

export default (
  <View style={styles.containerStyles}>
    <Text style={styles.textStyle}>Meal Meter</Text>
    <ActivityIndicator
      style={[styles.centering, { transform: [{ scale: 1.5 }] }]}
      size="large"
    />
  </View>
);
