import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { numOfEntriesForAverage } from '../config';
import { computeGoalAveragesFromEntries, entryValueHex } from '../helpers';
import { notLight } from '../styleVars';
import Card from './common/Card';

class AvgWidget extends Component {
  renderTopGoals() {
    const { rowStyle, goalScoreStyle, goalTextStyle } = styles;
    const goalAvgs = computeGoalAveragesFromEntries(this.props.latestEntries);

    return _.map(this.props.goals, (goal) => {
      const goalAvg = goalAvgs[goal.id];
      console.log('blah', entryValueHex(goalAvg));

      return (
        <View key={goal.id} style={rowStyle}>
          <Text style={{ ...goalScoreStyle, color: entryValueHex(goalAvg) }}>{goalAvg}</Text>
          <Text style={goalTextStyle}>{goal.text}</Text>
        </View>
      );
    });
  }
  render() {
    const { containerStyle, headerStyle } = styles;

    return (
      <Card>
        <Text style={headerStyle}>Last {numOfEntriesForAverage} avg per goal</Text>
        {this.renderTopGoals()}
      </Card>
    );
  }
}

const styles = {
  containerStyle: {},
  headerStyle: {
    fontSize: 18,
    marginTop: 5,
    marginBottom: 15,
    textAlign: 'center',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  goalScoreStyle: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '600',
    paddingRight: 10,
  },
  goalTextStyle: {
    fontSize: 16,
    fontFamily: 'Helvetica',
  },
};

const mapStateToProps = (state) => {
  const { entries, goals } = state;

  return {
    goals,
    latestEntries: entries.slice(Math.max(entries.length - numOfEntriesForAverage, 0)) || [],
  };
};

export default connect(mapStateToProps)(AvgWidget);
