import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { numOfEntriesForAverage } from '../config';
import { computeGoalAveragesFromEntries, entryValueHex } from '../helpers';
import Card from './common/Card';

class GoalAvgWidget extends Component {
  renderTopGoals() {
    const { rowStyle, goalScoreStyle, goalScoreWrapperStyle, goalTextStyle } = styles;
    const goalAvgs = computeGoalAveragesFromEntries(this.props.entries);

    const orderedGoals = _.sortBy(this.props.goals, (goal) => {
      return goalAvgs[goal.id];
    });

    return _.map(orderedGoals, (goal) => {
      const goalAvg = goalAvgs[goal.id];

      return (
        <View key={goal.id} style={rowStyle}>
          <View style={goalScoreWrapperStyle}>
            <Text style={{ ...goalScoreStyle, color: entryValueHex(goalAvg) }}>{goalAvg}</Text>
          </View>
          <Text style={goalTextStyle}>{goal.text}</Text>
        </View>
      );
    });
  }
  render() {
    const { headerStyle } = styles;

    return (
      <Card paddingless>
        <Text style={headerStyle}>{this.props.headerText}</Text>
        {this.renderTopGoals()}
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    marginTop: 10,
  },
  headerStyle: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '400',
  },
  rowStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderColor: '#CCC',
  },
  goalScoreWrapperStyle: {
    width: 40,
    borderRightWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
  },
  goalScoreStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '600',
  },
  goalTextStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
};

const mapStateToProps = (state) => {
  const { goals } = state;

  return {
    goals,
  };
};

export default connect(mapStateToProps)(GoalAvgWidget);
