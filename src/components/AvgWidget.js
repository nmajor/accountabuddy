import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { numOfEntriesForAverage } from '../config';
import { computeAverageFromEntries, entryValueHex } from '../helpers';
import { notLight } from '../styleVars';
import Card from './common/Card';

class AvgWidget extends Component {
  renderEntryAverage() {
    const { loudStyle, softStyle, labelStyle } = styles;
    const averageScore = computeAverageFromEntries(this.props.latestEntries);

    let scoreElement = <Text style={softStyle}>0</Text>;

    if (averageScore !== null) {
      const textStyle = { ...loudStyle, color: entryValueHex(averageScore) };
      scoreElement = <Text style={textStyle}>{averageScore}</Text>;
    }

    return (
      <View>
        {scoreElement}
        <Text style={labelStyle}>Last {numOfEntriesForAverage} avg</Text>
      </View>
    );
  }
  renderDayAverage() {
    const { loudStyle, softStyle, labelStyle } = styles;
    const averageScore = computeAverageFromEntries(this.props.dayEntries);

    let scoreElement = <Text style={softStyle}>0</Text>;

    if (averageScore !== null) {
      const textStyle = { ...loudStyle, color: entryValueHex(averageScore) };
      scoreElement = <Text style={textStyle}>{averageScore}</Text>;
    }

    return (
      <View>
        {scoreElement}
        <Text style={labelStyle}>Today's avg</Text>
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
  softStyle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 65,
    fontWeight: '400',
    color: notLight,
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
  const today = new Date().toDateString();

  return {
    latestEntries: entries.slice(Math.max(entries.length - numOfEntriesForAverage, 0)) || [],
    dayEntries: _.filter(entries, (e) => {
      return new Date(e.createdAt || undefined).toDateString() === today;
    }) || [],
  };
};

export default connect(mapStateToProps)(AvgWidget);
