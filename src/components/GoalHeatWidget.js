import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { View, Text } from 'react-native';
import { entryValueHex } from '../helpers';
import Card from './common/Card';

class GoalHeatWidget extends Component {
  constructor(props, context) {
    super(props, context);

    this.entriesPerDay = this.getEntriesPerDay(props);
  }
  componentWillReceiveProps(nextProps) {
    this.entriesPerDay = this.getEntriesPerDay(nextProps);
  }
  getEntriesPerDay(props) {
    const { entries } = props;

    const entriesPerDay = {};
    _.each(entries, (entry) => {
      const day = new Date(entry.createdAt || undefined).toDateString();
      entriesPerDay[day] = entriesPerDay[day] || {};
      _.each(entry.results, (score, goalId) => {
        entriesPerDay[day][goalId] = entriesPerDay[day][goalId] || {};
        if (score !== 0) {
          entriesPerDay[day][goalId].count = (entriesPerDay[day][goalId].count || 0) + 1;
          entriesPerDay[day][goalId].totalScore = (entriesPerDay[day][goalId].totalScore || 0) + score;
        }
      });
    });

    return entriesPerDay;
  }
  renderGoalHeatBar(goal) {
    const { days } = this.props;
    const {
      heatContainerStyle,
      heatElementStyle,
    } = styles;

    const heatElements = [];
    _.times(days, (num) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - ((days - 1) - num));
      const dayString = dateObj.toDateString();
      let elm = <View key={dayString} style={heatElementStyle} />;

      if (this.entriesPerDay[dayString]) {
        const { totalScore, count } = this.entriesPerDay[dayString][goal.id];
        const avg = _.round(totalScore / count, 1);
        const style = { ...heatElementStyle, backgroundColor: entryValueHex(avg) };
        elm = <View key={dayString} style={style} />;
      }

      heatElements.push(elm);
    });

    return <View style={heatContainerStyle}>{heatElements}</View>;
  }
  renderGoalHeatBars() {
    const {
      goalContainerStyle,
      goalTextStyle,
      heatHelperText,
    } = styles;

    return this.props.goals.map((goal) => {
      return (
        <View key={goal.id} style={goalContainerStyle}>
          <Text style={goalTextStyle}>{goal.text}</Text>
          {this.renderGoalHeatBar(goal)}
          <Text style={heatHelperText}>now</Text>
        </View>
      );
    });
  }
  render() {
    return (
      <Card>
        <Text style={styles.headerText}>Average Score Per Day</Text>
        {this.renderGoalHeatBars()}
      </Card>
    );
  }
}

const styles = {
  headerText: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
  },
  goalContainerStyle: {},
  goalTextStyle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  heatContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heatElementStyle: {
    width: 20,
    height: 20,
    backgroundColor: '#CCC',
    flex: 1,
    marginRight: 1,
  },
  heatHelperText: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    textAlign: 'right',
    fontSize: 10,
    paddingRight: 3,
  },
};

const mapStateToProps = (state) => {
  const { goals } = state;

  return { goals };
};

export default connect(mapStateToProps)(GoalHeatWidget);
