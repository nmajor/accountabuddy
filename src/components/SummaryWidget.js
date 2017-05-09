import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Card from './common/Card';
import { entryValueHex, computeAverageFromEntries } from '../helpers';
import _ from 'lodash';

// Avg score per day (last 3 days)
// Avg socre per entry (last 3 days)
// Entries per day ()

class SummaryWidget extends Component {
  renderRow(value, desc, style = {}) {
    const {
      rowContainerStyle,
      rowValueStyle,
      rowValueTextStyle,
      rowDescStyle,
    } = styles;

    return (
      <View style={{ ...rowContainerStyle, ...style.rowContainerStyle }}>
        <View style={rowValueStyle}>
          <Text style={{ ...rowValueTextStyle, color: entryValueHex(value), ...style.rowValueTextStyle }}>{value}</Text>
        </View>
        <Text style={rowDescStyle}>{desc}</Text>
      </View>
    );
  }
  renderAverage() {
    const { entries } = this.props;
    const averageScore = computeAverageFromEntries(entries);

    return this.renderRow(averageScore, 'Average score');
  }
  renderEntriesPerDay() {
    const { entries } = this.props;

    const entriesPerDay = {};
    _.each(entries, (entry) => {
      const day = new Date(entry.createdAt || undefined).toDateString();
      entriesPerDay[day] = (entriesPerDay[day] || 0) + 1;
    });

    const numOfDaysWithEntry = Object.keys(entriesPerDay).length;

    const value = _.reduce(entriesPerDay, (sum, count) => {
      return sum + count;
    }, 0) / numOfDaysWithEntry;

    return this.renderRow(_.round(value, 1), 'Average entries per day', {
      rowContainerStyle: { borderBottomWidth: 0 },
      rowValueTextStyle: { color: '#333' },
    });
  }
  render() {
    return (
      <Card paddingless>
        {this.renderAverage()}
        {this.renderEntriesPerDay()}
      </Card>
    );
  }
}

const styles = {
  rowContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#CCC',
    borderBottomWidth: 1,
  },
  rowValueStyle: {
    width: 45,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#EEE',
  },
  rowValueTextStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '600',
  },
  rowDescStyle: {
    padding: 12,
    fontSize: 16,
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
};

export default SummaryWidget;
