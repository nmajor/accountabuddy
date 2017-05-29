import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Container from './common/Container';
import { primaryColor } from '../styleVars';
import SummaryWidget from './SummaryWidget';
import GoalHeatWidget from './GoalHeatWidget';
import GoalAvgWidget from './GoalAvgWidget';
// import StatsGraphWidget from './StatsGraphWidget';

class Stats extends Component {
  constructor(props, context) {
    super(props, context);

    this.dayOptions = [3, 7, 30];
    this.state = {
      days: 3,
    };

    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.entries = this.getEntries(props, this.state);
  }
  componentWillUpdate(nextProps, nextState) {
    this.entries = this.getEntries(nextProps, nextState);
  }
  getEntries(props, state) {
    const startingDay = new Date();
    startingDay.setDate(startingDay.getDate() - state.days);
    startingDay.setHours(0, 0, 0, 0);

    return _.filter(props.entries, (entry) => {
      return new Date(entry.createdAt || undefined) > startingDay;
    });
  }
  handleOptionClick(option) {
    this.setState({ days: option });
  }
  renderOptionTextStyle(option) {
    const { headerOptionTextStyle, selectedHeaderOptionTextStyle } = styles;
    const selected = (option === this.state.days);

    if (selected) {
      return { ...headerOptionTextStyle, ...selectedHeaderOptionTextStyle };
    }
  }
  renderOptions() {
    return this.dayOptions.map((option) => {
      return this.renderOption(option);
    });
  }
  renderOption(option) {
    const { headerOptionStyle } = styles;

    return (
      <TouchableOpacity key={option} onPress={() => { this.handleOptionClick(option); }} style={headerOptionStyle}>
        <Text style={this.renderOptionTextStyle(option)}>Last {option} days</Text>
      </TouchableOpacity>
    );
  }
  renderHeader() {
    const {
      headerContainerStyle,
    } = styles;

    return (
      <View style={headerContainerStyle}>
        {this.renderOptions()}
      </View>
    );
  }
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        {this.renderHeader()}
        <ScrollView style={{ flex: 1 }}>
          <SummaryWidget entries={this.entries} days={this.state.days} />
          <GoalHeatWidget entries={this.entries} days={this.state.days} />
          <GoalAvgWidget headerText="Avg Score Per Goal" entries={this.entries} />
          <View style={{ marginBottom: 15 }} />
        </ScrollView>
      </Container>
    );
  }
}

const styles = {
  headerContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  headerOptionStyle: {
    padding: 15,
  },
  headerOptionTextStyle: {
    fontFamily: 'Helvetica',
    fontSize: 14,
    fontWeight: '100',
  },
  selectedHeaderOptionTextStyle: {
    fontWeight: '400',
    fontSize: 14,
    color: primaryColor,
  },
};

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(Stats);
