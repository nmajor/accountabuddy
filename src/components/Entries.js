import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import Container from './common/Container';
import EntryCard from './EntryCard';

class Entries extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(entries);
  }
  renderEntry(entry) {
    return <EntryCard entry={entry} />;
  }
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderEntry}
        />
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
