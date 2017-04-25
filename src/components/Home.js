import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Container from './common/Container';
import EntryForm from './EntryForm';
import StatsWidget from './StatsWidget';

class Home extends Component {
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <ScrollView style={{ flex: 1 }}>
          <EntryForm />
          <StatsWidget />
          <View style={{ marginBottom: 200 }} />
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
