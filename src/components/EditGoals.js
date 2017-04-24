import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { primaryColor } from '../styleVars';
import { createGoal, removeGoal, hideGoal } from '../actions';
import Card from './common/Card';
import GoalCard from './GoalCard';

class EditGoals extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      textValue: '',
    };
  }
  onFinishedPress() {
    Actions.home({ type: ActionConst.RESET });
  }
  handleTextChange(val) {
    this.setState({ textValue: val });
  }
  submitGoal() {
    this.props.createGoal({ text: this.state.textValue });
    this.setState({ textValue: '' });
  }
  removeGoal(id) {
    const { entries } = this.props;
    if (_.some(entries, (entry) => { return entry.goalId === id; })) {
      this.props.hideGoal(id);
    } else {
      this.props.removeGoal(id);
    }
  }
  renderGoals() {
    return this.props.goals.map((goal) => {
      return (
        <GoalCard
          key={goal.id}
          goal={goal}
          onActionPress={() => { this.removeGoal(goal.id); }}
        />
      );
    });
  }
  renderFinishedButton() {
    const {
      buttonStyle,
      touchableStyle,
      buttonTextStyle,
    } = styles;

    if (this.props.goals.length > 0) {
      return (
        <View style={buttonStyle}>
          <TouchableOpacity style={touchableStyle} onPress={this.onFinishedPress.bind(this)}>
            <Text style={buttonTextStyle}>Finished</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    const { labelStyle, inputContainerStyle, inputStyle } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.renderGoals()}
          <Card
            buttonText="Submit"
            onButtonPress={this.submitGoal.bind(this)}
          >
            <Text style={labelStyle}>Tell us a goal you have for each meal:</Text>
            <View style={inputContainerStyle}>
              <TextInput
                placeholder="1/4 or less of carbs"
                style={inputStyle}
                value={this.state.textValue}
                onChangeText={this.handleTextChange.bind(this)}
              />
            </View>
          </Card>
        </View>
        {this.renderFinishedButton()}
      </View>
    );
  }
}

const styles = {
  labelStyle: {
    fontFamily: 'Helvetica',
    fontWeight: '100',
    fontSize: 16,
    marginBottom: 15,
  },
  inputContainerStyle: {
    borderColor: '#888',
    borderBottomWidth: 1,
    height: 35,
  },
  inputStyle: {
    fontSize: 16,
    lineHeight: 20,
    flex: 1,
    fontFamily: 'Helvetica',
    fontWeight: '100',
  },
  buttonStyle: {
    justifyContent: 'center',
    backgroundColor: primaryColor,
    height: 50,
  },
  touchableStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Helvetica',
    fontWeight: '300',
    fontSize: 18,
  },
};

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    goals: state.goals,
  };
};

export default connect(mapStateToProps, { createGoal, removeGoal, hideGoal })(EditGoals);
