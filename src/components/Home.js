import React, { Component } from 'react';
import Container from './common/Container';
import EntryForm from './EntryForm';

class Home extends Component {
  render() {
    return (
      <Container>
        <EntryForm />
      </Container>
    );
  }
}

export default Home;
