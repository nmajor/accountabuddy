import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './common/Card';
import { badDark, goodDark, nuturalDark, notDark } from '../styleVars';

class EntryCard extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expanded: false,
    };
  }
  // componentWillUpdate() {
  //   LayoutAnimation.spring();
  // }
  handlePress() {
    this.setState({ expanded: !this.state.expanded });
  }
  renderResultBadge(result) {
    const { resultPreviewStyle, resultPreviewText } = styles;

    return (
      <View style={resultPreviewStyle[result]}>
        <Text style={resultPreviewText}>{result}</Text>
      </View>
    );
  }
  renderHeaderEntriesPreview() {
    return _.map(this.props.entry.results, (result, goalId) => {
      return <View key={goalId}>{this.renderResultBadge(result)}</View>;
    });
  }
  renderEntriesResults() {
    const { resultEntryStyle } = styles;

    return _.map(this.props.entry.results, (result, goalId) => {
      const goal = _.find(this.props.goals, (g) => { return g.id === goalId; });

      return (
        <View style={resultEntryStyle} key={goalId}>
          <Text style={{ flex: 1 }}>{goal.text}</Text>
          <View style={{ width: 30 }}>{this.renderResultBadge(result)}</View>
        </View>
      );
    });
  }
  renderHeaderText() {
    const { headerTextStyle } = styles;

    return (<Text style={headerTextStyle}>
      {moment(this.props.entry.createdAt).format('M/D/YY h:mm:ss a')}
    </Text>);
  }
  renderHeader() {
    if (this.state.expanded) {
      return (<View style={{ flexDirection: 'row' }}>
        {this.renderHeaderText()}
        <Text>{` - ${moment(this.props.entry.createdAt).fromNow()}`}</Text>
      </View>);
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          {this.renderHeaderText()}
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          {this.renderHeaderEntriesPreview()}
        </View>
      </View>
    );
  }
  renderBody() {
    const { bodyStyle } = styles;

    if (this.state.expanded) {
      return <View style={bodyStyle}>{this.renderEntriesResults()}</View>;
    }
  }
  render() {
    return (
      <Card>
        <TouchableOpacity onPress={this.handlePress.bind(this)}>
          {this.renderHeader()}
          {this.renderBody()}
        </TouchableOpacity>
      </Card>
    );
  }
}

const badgeStyle = {
  marginLeft: 4,
  width: 20,
  height: 20,
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = {
  headerTextStyle: {
    fontFamily: 'Helvetica',
    fontSize: 15,
    fontWeight: '600',
  },
  resultPreviewStyle: {
    0: {
      ...badgeStyle,
      backgroundColor: notDark,
    },
    1: {
      ...badgeStyle,
      backgroundColor: badDark,
    },
    2: {
      ...badgeStyle,
      backgroundColor: nuturalDark,
    },
    3: {
      ...badgeStyle,
      backgroundColor: goodDark,
    },
  },
  resultPreviewText: {
    fontFamily: 'Helvetica',
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  resultEntryStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  bodyStyle: {
    paddingTop: 15,
  },
};

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
  };
};


export default connect(mapStateToProps)(EntryCard);