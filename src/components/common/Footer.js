import React, { Component } from 'react';
import { View } from 'react-native';
import FooterIcon from './FooterIcon';
import { Actions, ActionConst } from 'react-native-router-flux';

class Footer extends Component {
  render() {
    const { footerStyle } = styles;



    return (
      <View style={footerStyle}>
        <FooterIcon
          text="Home"
          onPress={() => { Actions.home({ type: ActionConst.RESET }); }}
          active={this.props.sceneKey === 'home'}
        />
        <FooterIcon
          text="Entries"
          onPress={() => { Actions.entries({ type: ActionConst.RESET }); }}
          active={this.props.sceneKey === 'entries'}
        />
        <FooterIcon
          text="Stats"
          onPress={() => { Actions.stats({ type: ActionConst.RESET }); }}
          active={this.props.sceneKey === 'stats'}
        />
        <FooterIcon
          text="Settings"
          onPress={() => { Actions.settings({ type: ActionConst.RESET }); }}
          active={this.props.sceneKey === 'settings'}
        />
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
