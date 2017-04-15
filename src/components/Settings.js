import React, { Component } from 'react';
import Container from './common/Container';
import RowCard from './common/RowCard';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <RowCard text="Edit Goals" onPress={() => { Actions.editGoals(); }} />
        <RowCard text="Remove Adds" />
        <RowCard text="Log Out" />
      </Container>
    );
  }
}

export default Settings;
