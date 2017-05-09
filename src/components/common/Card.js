import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { primaryColor } from '../../styleVars';

class Card extends Component {
  renderHeader() {
    if (this.props.headerText) {
      return (
        <View><Text style={styles.headerStyle}>{this.props.headerText}</Text></View>
      );
    }
  }
  renderButton() {
    const { buttonText, onButtonPress } = this.props;
    const { buttonStyle, buttonTextStyle, touchableStyle } = styles;

    if (buttonText) {
      return (
        <View style={buttonStyle}>
          <TouchableOpacity style={touchableStyle} onPress={onButtonPress}>
            <Text style={buttonTextStyle}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    const { containerStyle } = styles;
    let { bodyStyle } = styles;

    if (this.props.paddingless) {
      bodyStyle = {
        ...bodyStyle,
        padding: 0,
      };
    }

    return (
      <View style={containerStyle}>
        {this.renderHeader()}
        <View style={bodyStyle}>
          {this.props.children}
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#EEE',
    borderBottomWidth: 0,
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
  },
  headerStyle: {
    fontFamily: 'Helvetica',
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  bodyStyle: {
    padding: 15,
  },
  buttonStyle: {
    backgroundColor: primaryColor,
    height: 50,
    justifyContent: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  buttonTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '300',
    fontSize: 18,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
  },
};

export default Card;
