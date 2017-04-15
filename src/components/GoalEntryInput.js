import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import * as styleVars from '../styleVars';
import { historyCount } from '../config';
import GoalHistory from './GoalHistory';

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
  renderOptionBadge(value) {
    const { optionBadgeStyle } = styles;
    let { optionTextStyle } = styles;

    if (value === 0) {
      optionTextStyle = {
        color: styleVars.notDark,
        fontWeight: '600',
      };
    }

    return (
      <View style={optionBadgeStyle[value]}>
        <Text style={optionTextStyle}>{this.renderValueLabel(value)}</Text>
      </View>
    );
  }
  renderOption(value, style, activeStyle) {
    const { selectedValue, goal } = this.props;
    const { optionStyle, baseActiveStyle, touchableStyle } = styles;
    let { optionTextStyle } = styles;

    style = {
      ...optionStyle,
      ...style,
    };

    let renderOptionBody = this.renderOptionBadge(value);

    if (value === selectedValue) {
      activeStyle = { ...baseActiveStyle, ...activeStyle };
      style = { ...style, ...activeStyle };

      optionTextStyle = { ...optionTextStyle, color: '#FFF' };
      renderOptionBody = <Text style={optionTextStyle}>{this.renderValueLabel(value)}</Text>;
    }


    return (
      <View style={style}>
        <TouchableOpacity
          style={touchableStyle}
          onPress={() => { this.props.selectValue(goal, value); }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>{renderOptionBody}</View>
        </TouchableOpacity>
      </View>
    );
  }
  renderBadOption() {
    return this.renderOption(1, {
    }, {
      backgroundColor: styleVars.badDark,
    });
  }
  renderNuturalOption() {
    return this.renderOption(2, {
    }, {
      backgroundColor: styleVars.nuturalDark,
    });
  }
  renderGoodOption() {
    return this.renderOption(3, {
    }, {
      backgroundColor: styleVars.goodDark,
    });
  }
  renderNAOption() {
    return this.renderOption(0, {
      borderRightWidth: 0,
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

    const { goal, recentEntries } = this.props;

    return (
      <View style={containerStyle}>
        <Text style={goalTextStyle}>{goal.text}</Text>
        <GoalHistory goal={goal} entries={recentEntries} />
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

const badgeStyle = {
  width: 20,
  height: 20,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
};

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
  baseActiveStyle: {
    // borderRightWidth: 0,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  optionBadgeStyle: {
    1: {
      ...badgeStyle,
      backgroundColor: styleVars.badDark,
    },
    2: {
      ...badgeStyle,
      backgroundColor: styleVars.nuturalDark,
    },
    3: {
      ...badgeStyle,
      backgroundColor: styleVars.goodDark,
    },
  },
  optionTextStyle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
};

const mapStateToProps = ({ entries }) => {
  return {
    recentEntries: entries.slice(Math.max(entries.length - historyCount, 1)),
  };
};

export default connect(mapStateToProps)(GoalEntryInput);
