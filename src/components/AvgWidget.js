import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { numOfEntriesForAverage } from '../config';
import { computeAverageFromEntries } from '../helpers';
import BoxWidget from './common/BoxWidget';

class AvgWidget extends Component {
  render() {
    const dayAvgData = {
      value: computeAverageFromEntries(this.props.dayEntries),
      desc: 'Today\'s avg',
      colorValue: true,
    };

    const entryAvgData = {
      value: computeAverageFromEntries(this.props.dayEntries),
      desc: 'Today\'s avg',
      colorValue: true,
    };

    return <BoxWidget leftSide={entryAvgData} rightSide={dayAvgData} />;
  }
}

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
