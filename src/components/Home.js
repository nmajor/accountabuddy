import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Container from './common/Container';
import EntryForm from './EntryForm';

class Home extends Component {
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <ScrollView style={{ flex: 1 }}>
          <EntryForm />
        </ScrollView>
      </Container>
    );
  }
}

export default Home;
