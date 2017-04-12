import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { textColorLight, primaryColor } from '../../styleVars';

const FooterIcon = (props) => {
  const { viewStyle } = styles;
  let { textStyle } = styles;

  if (props.active) {
    textStyle = { ...textStyle, color: primaryColor };
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={viewStyle}>
      <Text style={textStyle}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  viewStyle: {
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 12,
    color: textColorLight,
  },
};

export default FooterIcon;
