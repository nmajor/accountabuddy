import React from 'react';
import { View, ActivityIndicator, Text, StatusBar } from 'react-native';
import { primaryColor } from '../styleVars';
// import { Actions, ActionConst } from 'react-native-router-flux';

const styles = {
  containerStyles: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  textStyle: {
    textAlign: 'center',
    color: primaryColor,
    fontSize: 26,
    paddingBottom: 30,
  },
};

export default (
  <View style={styles.containerStyles}>
    <StatusBar
      barStyle="dark-content"
    />
    <Text style={styles.textStyle}>Meal Meter</Text>
    <ActivityIndicator
      style={[styles.centering, { transform: [{ scale: 1.5 }] }]}
      color={primaryColor}
      size="large"
    />
  </View>
);
