import React, { Component } from 'react';
import { Text } from 'react-native';
import Card from './common/Card';

class StatsGraphWidget extends Component {
  render() {
    return (
      <Card>
        <Text>Graph {this.props.entries.length}</Text>
      </Card>
    );
  }
}

export default StatsGraphWidget;
