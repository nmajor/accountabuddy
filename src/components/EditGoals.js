import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
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
  render() {
    // const { labelStyle, inputStyle } = styles;
    const { labelStyle, inputContainerStyle, inputStyle } = styles;

    return (
      <View>
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
};

const mapStateToProps = (state) => {
  return {
    entries: state.entries,
    goals: state.goals,
  };
};

export default connect(mapStateToProps, { createGoal, removeGoal, hideGoal })(EditGoals);
