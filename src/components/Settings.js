import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-native';
import Container from './common/Container';
import RowCard from './common/RowCard';
import { Actions } from 'react-native-router-flux';
import { deleteAllEntries } from '../actions';

class Settings extends Component {
  onDeleteAllEntriesPress() {
    Alert.alert(
      'Are you sure?',
      'You are about to\ delete all your entries since the beginning of time!',
      [
        { text: 'Confirm', style: 'destructive', onPress: () => {
          this.props.deleteAllEntries();
        } },
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      ],
    );
  }
  // <RowCard text="Remove Adds" />
  // <RowCard text="Log Out" />
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <RowCard text="Edit Goals" onPress={() => { Actions.editGoals({ hideFinish: true }); }} />
        <RowCard text="Delete All Entries" onPress={this.onDeleteAllEntriesPress.bind(this)} />
      </Container>
    );
  }
}

export default connect(null, { deleteAllEntries })(Settings);
