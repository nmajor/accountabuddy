import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
const saladImage = require('../assets/images/healthy-salad.png');

class Welcome extends Component {
  render() {
    const { imageContainerStyle, imageStyle } = styles;

    // return (
    //   <Image source={saladImage}>
    //   </Image>
    // );

    return (
      <View style={imageContainerStyle}>
        <Image style={imageStyle} source={saladImage}>
          <Text style={{ color: '#FFF' }}>Hello</Text>
        </Image>
      </View>
    );
  }
}

const styles = {
  imageContainerStyle: {
    height: null,
    width: null,
    flex: 1,
    backgroundColor: '#333',
  },
  imageStyle: {
    height: null,
    width: null,
    flex: 1,
    opacity: 0.5,
  },
};

export default Welcome;
