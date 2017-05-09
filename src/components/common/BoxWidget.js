import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import _ from 'lodash';
import { numOfEntriesForAverage } from '../../config';
import { entryValueHex } from '../../helpers';
import { notLight } from '../../styleVars';
import Card from './Card';

class BoxWidget extends Component {
  renderElement(data) {
    const { loudStyle, softStyle, labelStyle } = styles;

    let scoreElement = <Text style={softStyle}>0</Text>;

    if (data.value !== null) {
      const textStyle = data.colorValue ? { ...loudStyle, color: entryValueHex(data.value) } : loudStyle;
      scoreElement = <Text style={textStyle}>{data.value}</Text>;
    }

    return (
      <View>
        {scoreElement}
        <Text style={labelStyle}>{data.desc}</Text>
      </View>
    );
    // '
  }
  render() {
    const { containerStyle, bufferBorder } = styles;
    return (
      <Card>
        <View style={containerStyle}>
          {this.renderElement(this.props.leftSide)}
          <View style={bufferBorder} />
          {this.renderElement(this.props.rightSide)}
        </View>
      </Card>
    );
  }
}

const styles = {
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loudStyle: {
    color: '#333',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 65,
    fontWeight: '400',
  },
  softStyle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontSize: 65,
    fontWeight: '400',
    color: notLight,
  },
  labelStyle: {
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '100',
    marginBottom: 20,
  },
  bufferBorder: {
    backgroundColor: 'pink',
    borderLeftWidth: 1,
    borderColor: '#DDD',
  },
};

const mapStateToProps = (state) => {
  const { entries } = state;
  const today = new Date().toDateString();

  return {
    latestEntries: entries.slice(Math.max(entries.length - numOfEntriesForAverage, 0)) || [],
    dayEntries: _.filter(entries, (e) => {
      return new Date(e.createdAt || undefined).toDateString() === today;
    }) || [],
  };
};

export default connect(mapStateToProps)(BoxWidget);
