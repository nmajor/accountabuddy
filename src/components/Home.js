import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import { numOfEntriesForAverage } from '../config';
import Container from './common/Container';
import EntryForm from './EntryForm';
import AvgWidget from './AvgWidget';
import GoalAvgWidget from './GoalAvgWidget';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.entries = this.getEntries(props);
  }
  componentWillReceiveProps(nextProps) {
    this.entries = this.getEntries(nextProps);
  }
  getEntries(props) {
    return props.entries.slice(Math.max(props.entries.length - numOfEntriesForAverage, 0)) || [];
  }
  renderTopWidget() {
    if (this.props.goals.length > 1 && this.props.hasEntries) {
      const headerText = `Avg of Last ${numOfEntriesForAverage} Entries`;
      return <GoalAvgWidget headerText={headerText} entries={this.entries} />;
    }
  }
  renderAvgWidget() {
    if (this.props.hasEntries) {
      return <AvgWidget />;
    }
  }
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <ScrollView style={{ flex: 1 }}>
          <EntryForm />
          {this.renderAvgWidget()}
          {this.renderTopWidget()}
          <View style={{ marginBottom: 15 }} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasEntries: state.entries.length > 0,
    entries: state.entries,
    goals: state.goals,
  };
};

export default connect(mapStateToProps)(Home);
