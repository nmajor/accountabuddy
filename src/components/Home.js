import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from 'react-native';
import Container from './common/Container';
import EntryForm from './EntryForm';
import AvgWidget from './AvgWidget';
import TopWidget from './TopWidget';

class Home extends Component {
  renderTopWidget() {
    if (this.props.goals.length > 1) {
      return <TopWidget />;
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
          {this.renderTopWidget()}
          {this.renderAvgWidget()}
          <View style={{ marginBottom: 200 }} />
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasEntries: state.entries.length > 0,
    goals: state.goals,
  };
};

export default connect(mapStateToProps)(Home);
