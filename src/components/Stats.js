import React, { Component } from 'react';
import { Text } from 'react-native';
import Container from './common/Container';

class Stats extends Component {
  render() {
    console.log('blah stats', this.props);
    return (
      <Container sceneKey={this.props.sceneKey}>
        <Text>Stats</Text>
      </Container>
    );
  }
}

export default Stats;
