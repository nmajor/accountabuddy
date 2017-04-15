import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as styleVars from '../styleVars';

class GoalEntryInput extends Component {
  // constructor(props, context) {
  //   super(props, context);
  // }
  renderValueLabel(value) {
    switch (value) {
      case 0:
        return 'NA';
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      default:
        return null;
    }
  }
  renderOption(value, style, activeStyle) {
    const { selectedValue, goal } = this.props;
    const { optionStyle, baseActiveStyle, touchableStyle } = styles;
    let { optionTextStyle } = styles;

    style = {
      ...optionStyle,
      ...style,
    };

    if (value === selectedValue) {
      activeStyle = { ...baseActiveStyle, ...activeStyle };
      style = { ...style, ...activeStyle };

      optionTextStyle = { ...optionTextStyle, color: '#FFF' };
    }

    return (
      <View style={style}>
        <TouchableOpacity
          style={touchableStyle}
          onPress={() => { this.props.selectValue(goal, value); }}
        >
          <Text style={optionTextStyle}>{this.renderValueLabel(value)}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderBadOption() {
    return this.renderOption(1, {
      // backgroundColor: styleVars.badLight,
    }, {
      backgroundColor: styleVars.badDark,
    });
  }
  renderNuturalOption() {
    return this.renderOption(2, {
      // backgroundColor: styleVars.nuturalLight,
    }, {
      backgroundColor: styleVars.nuturalDark,
    });
  }
  renderGoodOption() {
    return this.renderOption(3, {
      // backgroundColor: styleVars.goodLight,
    }, {
      backgroundColor: styleVars.goodDark,
    });
  }
  renderNAOption() {
    return this.renderOption(0, {
      borderRightWidth: 0,
      // backgroundColor: styleVars.notLight,
    }, {
      backgroundColor: styleVars.notDark,
    });
  }
  render() {
    const {
      containerStyle,
      goalTextStyle,
      optionGroupStyle,
    } = styles;

    const { goal } = this.props;

    return (
      <View style={containerStyle}>
        <Text style={goalTextStyle}>{goal.text}</Text>
        <View style={optionGroupStyle}>
          {this.renderBadOption()}
          {this.renderNuturalOption()}
          {this.renderGoodOption()}
          {this.renderNAOption()}
        </View>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    marginBottom: 15,
  },
  goalTextStyle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginBottom: 10,
  },
  optionGroupStyle: {
    borderColor: '#CCC',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#CCC',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
  },
  optionStyle: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    height: 40,
    borderRightWidth: 1,
    borderColor: '#CCC',
  },
  optionTextStyle: {
    textAlign: 'center',
  },
  baseActiveStyle: {
    // borderRightWidth: 0,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
  },
};

export default GoalEntryInput;
