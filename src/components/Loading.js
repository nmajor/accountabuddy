import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, Text } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.welcomed) {
      Actions.welcome({ type: ActionConst.RESET });
    } else if (nextProps.goals.length === 0) {
      Actions.newGoals({ type: ActionConst.RESET });
    } else {
      Actions.home({ type: ActionConst.RESET });
    }
  }
  render() {
    const { containerStyles, textStyle } = styles;

    return (
      <View style={containerStyles}>
        <Text style={textStyle}>Accountabuddy</Text>
        <ActivityIndicator
          style={[styles.centering, { transform: [{ scale: 1.5 }] }]}
          size="large"
        />
      </View>
    );
  }
}

const styles = {
  containerStyles: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333',
    paddingBottom: 200,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 26,
    paddingBottom: 30,
  },
};

const mapStateToProps = ({ welcomed, goals }) => {
  return { welcomed, goals };
};

export default connect(mapStateToProps)(Home);
