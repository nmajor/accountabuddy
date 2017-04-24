import React, { Component } from 'react';
import { View } from 'react-native';
import { historyCount } from '../config';
import * as styleVars from '../styleVars';

class GoalHistory extends Component {
  renderPlainOptionBadge(value) {
    const { plainBadgeStyle } = styles;

    return (<View style={plainBadgeStyle[value]} />);
  }

  renderHistoryBadges() {
    const { goal, entries } = this.props;

    const paddedEntries = [...entries];
    paddedEntries.unshift.apply(paddedEntries, new Array(historyCount - entries.length));

    return paddedEntries.map((entry, index) => {
      if (!entry || entry.results[goal.id] === undefined) { return <View key={index} style={badgeStyle} />; }

      return <View key={index}>{this.renderPlainOptionBadge(entry.results[goal.id])}</View>;
    });
  }
  render() {
    const { goalHistoryStyle } = styles;
    return (<View style={goalHistoryStyle}>{this.renderHistoryBadges()}</View>);
  }
}

const badgeStyle = {
  width: 15,
  height: 15,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = {
  goalHistoryStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  plainBadgeStyle: {
    0: {
      ...badgeStyle,
      backgroundColor: styleVars.notDark,
    },
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
};

export default GoalHistory;
