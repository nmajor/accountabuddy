import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Container from './common/Container';
import RowCard from './common/RowCard';
import { Actions } from 'react-native-router-flux';
import { deleteAllEntries, deleteAllGoals, createSeedEntry } from '../actions';
import _ from 'lodash';

class Settings extends Component {
  constructor(props, context) {
    super(props, context);
    this.generateRandomResults = this.generateRandomResults.bind(this);
  }
  onSeedTestEntriesPress() {
    const days = 35;
    _.times(days, (num) => {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - ((days - 1) - num));

      _.times(_.random(3, 5), () => {
        this.props.createSeedEntry({
          results: this.generateRandomResults(),
          createdAt: dateObj,
        });
      });
    });
  }
  onDeleteAllEntriesPress() {
    Alert.alert(
      'Are you sure?',
      'You are about to delete all your entries since the beginning of time!',
      [
        { text: 'Confirm', style: 'destructive', onPress: () => {
          this.props.deleteAllEntries();
        } },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
    );
  }
  onDeleteAllGoalsPress() {
    Alert.alert(
      'Are you sure?',
      'You are about to delete all your goals since the beginning of time!',
      [
        { text: 'Confirm', style: 'destructive', onPress: () => {
          this.props.deleteAllGoals();
        } },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
    );
  }
  generateRandomResults() {
    return this.props.goals.reduce((acc, goal) => {
      acc[goal.id] = _.random(1, 3);
      return acc;
    }, {});
  }
  // <RowCard text="Remove Adds" />
  // <RowCard text="Log Out" />
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <RowCard text="Edit Goals" onPress={() => { Actions.editGoals({ hideFinish: true }); }} />
        <RowCard text="Delete All Entries" onPress={this.onDeleteAllEntriesPress.bind(this)} />
        <RowCard text="Delete All Goals" onPress={this.onDeleteAllGoalsPress.bind(this)} />
        <RowCard text="Seed Test Entries" onPress={this.onSeedTestEntriesPress.bind(this)} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { goals: state.goals };
};

export default connect(mapStateToProps, { deleteAllEntries, deleteAllGoals, createSeedEntry })(Settings);
