import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Card extends Component {
  renderHeader() {
    if (this.props.headerText) {
      return (
        <View><Text style={styles.headerStyle}>{this.props.headerText}</Text></View>
      );
    }
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        {this.renderHeader()}
        {this.props.children}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#FFF',
    // borderWidth: 1,
    borderRadius: 4,
    // borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 15,
  },
  headerStyle: {
    fontFamily: 'Helvetica',
    fontSize: 24,
    marginBottom: 15,
  },
};

export default Card;
