import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { numOfEntriesForAverage } from '../config';
import { computeGoalAverageFromEntries, percentageOfColor } from '../helpers';
import Card from './common/Card';

class StatsWidget extends Component {
  renderDayAverage() {
    const { loudStyle, labelStyle } = styles;
    const averageScore = computeGoalAverageFromEntries(this.props.latestEntries);

    percentageOfColor('#CC2C0E', '#FFDD37', 0.2);

    return (
      <View>
        <Text style={loudStyle}>{averageScore}</Text>
        <Text style={labelStyle}>Last {numOfEntriesForAverage} avg</Text>
      </View>
    );
  }
  renderEntryAverage() {
    const { loudStyle, labelStyle } = styles;
    const averageScore = computeGoalAverageFromEntries(this.props.latestEntries);

    return (
      <View>
        <Text style={loudStyle}>{averageScore}</Text>
        <Text style={labelStyle}>Last {numOfEntriesForAverage} avg</Text>
      </View>
    );
  }
  render() {
    const { containerStyle, bufferBorder } = styles;
    return (
      <Card>
        <View style={containerStyle}>
          {this.renderEntryAverage()}
          <View style={bufferBorder} />
          {this.renderDayAverage()}
        </View>
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loudStyle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 65,
    fontWeight: '400',
  },
  labelStyle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    marginBottom: 20,
  },
  bufferBorder: {
    backgroundColor: 'pink',
    borderLeftWidth: 1,
    borderColor: '#DDD',
  },
};

const mapStateToProps = (state) => {
  const { entries } = state;

  return {
    latestEntries: entries.slice(Math.max(entries.length - numOfEntriesForAverage, 0)),
  };
};

export default connect(mapStateToProps)(StatsWidget);
