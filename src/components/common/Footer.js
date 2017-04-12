import React, { Component } from 'react';
import { View } from 'react-native';
import FooterIcon from './FooterIcon';

class Footer extends Component {
  render() {
    const { footerStyle } = styles;

    return (
      <View style={footerStyle}>
        <FooterIcon text="Home" onPress={() => { console.log('Home pressed'); }} active />
        <FooterIcon text="Stats" onPress={() => { console.log('Stats pressed'); }} />
        <FooterIcon text="Entries" onPress={() => { console.log('Entries pressed'); }} />
        <FooterIcon text="Settings" onPress={() => { console.log('Settings pressed'); }} />
      </View>
    );
  }
}

const styles = {
  footerStyle: {
    borderTopColor: '#CCC',
    borderTopWidth: 1,
    flex: 1,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
};

export default Footer;
