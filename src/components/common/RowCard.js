import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class RowCard extends Component {
  render() {
    const { containerStyle, touchableStyle, textStyle } = styles;

    return (
      <View style={containerStyle}>
        <TouchableOpacity style={touchableStyle} onPress={this.props.onPress}>
          <Text style={textStyle}>{this.props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#FFF',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  textStyle: {
    fontSize: 16,
  },
};

export default RowCard;
