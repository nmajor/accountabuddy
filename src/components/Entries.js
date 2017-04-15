import React, { Component } from 'react';
import { ListView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import Container from './common/Container';
import EntryCard from './EntryCard';

class Entries extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      date: new Date(),
    };
  }
  componentWillMount() {
    this.createDataSource(this.props);
  }
  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }
  componentDidUpdate() {
    this.createDataSource(this.props);
  }
  createDataSource({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const dateString = this.state.date.toDateString();
    const filteredEntries = _.filter(entries, (entry) => {
      return new Date(entry.createdAt || undefined).toDateString() === dateString;
    });

    this.dataSource = ds.cloneWithRows(filteredEntries);
  }
  nextDay() {}
  prevDay() {}
  renderEntry(entry) {
    return <EntryCard entry={entry} />;
  }
  renderDateText() {
    const { headerDateStyle } = styles;

    if (this.state.date.toDateString() === new Date().toDateString()) {
      return <Text style={headerDateStyle}>Today</Text>;
    }

    return <Text style={headerDateStyle}>{moment(this.state.date).format('M/D/YY')}</Text>;
  }
  renderNextDayAction() {
    const {
      headerSharedStyle,
      headerActionStyle,
    } = styles;

    if (this.state.date.toDateString() === new Date().toDateString()) {
      return <View style={{ ...headerSharedStyle, flex: 1 }} />;
    }

    return (
      <TouchableOpacity onPress={this.nextDay} style={{ ...headerSharedStyle, flex: 1 }}>
        <Text style={headerActionStyle}>{'>'}</Text>
      </TouchableOpacity>
    );
  }
  renderPrevDayAction() {
    const {
      headerSharedStyle,
      headerActionStyle,
    } = styles;

    return (
      <TouchableOpacity onPress={this.nextDay} style={{ ...headerSharedStyle, flex: 1 }}>
        <Text style={headerActionStyle}>{'<'}</Text>
      </TouchableOpacity>
    );
  }
  renderDateHeader() {
    const {
      headerSharedStyle,
      headerContainerStyle,
    } = styles;

    return (
      <View style={{ ...headerSharedStyle, ...headerContainerStyle }}>
        {this.renderPrevDayAction()}
        <View style={{ ...headerSharedStyle, flex: 1 }}>
          {this.renderDateText()}
        </View>
        {this.renderNextDayAction()}
      </View>
    );
  }
  render() {
    return (
      <Container sceneKey={this.props.sceneKey}>
        {this.renderDateHeader()}
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderEntry}
        />
      </Container>
    );
  }
}

const styles = {
  headerSharedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerContainerStyle: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    shadowColor: '#DDDDDD',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  headerDateStyle: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 15,
  },
  headerActionStyle: {
    fontFamily: 'Helvetica',
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 15,
    width: 50,
  },
};

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
  };
};

export default connect(mapStateToProps)(Entries);
