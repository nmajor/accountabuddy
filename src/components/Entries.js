import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from './common/Container';
import EntryCard from './EntryCard';

class Entries extends Component {
  renderEntries() {
    return this.props.entries.map((entry) => {
      return <EntryCard key={entry.id} entry={entry} />;
    });
  }
  render() {
    console.log('blah ', this.props.entries);
    console.log('blah ', this.props.goals);
    return (
      <Container sceneKey={this.props.sceneKey}>
        {this.renderEntries()}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(Entries);
