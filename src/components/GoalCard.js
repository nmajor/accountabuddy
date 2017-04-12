import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Card from './common/Card';

class GoalCard extends Component {
  render() {
    const { containerStyle, textStyle, actionStyle, actionTextStyle } = styles;

    return (
      <Card>
        <View style={containerStyle}>
          <Text style={textStyle}>{this.props.goal.text}</Text>
          <View style={actionStyle}>
            <TouchableOpacity onPress={this.props.onActionPress}>
              <Text style={actionTextStyle}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
  actionStyle: {
    // width: 40,
  },
  actionTextStyle: {
    fontSize: 16,
  },
};

export default GoalCard;
