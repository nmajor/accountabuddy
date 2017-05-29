import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from './common/Container';
import RowCard from './common/RowCard';
import { Actions } from 'react-native-router-flux';
import { deleteAllEntries } from '../actions';

class Settings extends Component {
  // <RowCard text="Remove Adds" />
  // <RowCard text="Log Out" />
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <RowCard text="Edit Goals" onPress={() => { Actions.editGoals({ hideFinish: true }); }} />
      </Container>
    );
  }
}

export default connect(null, { deleteAllEntries })(Settings);
