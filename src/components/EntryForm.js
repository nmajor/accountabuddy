import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { createEntry } from '../actions';
import Card from './common/Card';
import GoalEntryInput from './GoalEntryInput';

class EntryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      entryResults: this.initialEntryResults(),
    };
  }
  setSelectedValueForGoal(goal, value) {
    const entryResults = { ...this.state.entryResults, [goal.id]: value };
    this.setState({ entryResults });
  }
  initialEntryResults() {
    return this.props.goals.reduce((acc, goal) => {
      acc[goal.id] = 0;
      return acc;
    }, {});
  }
  submit() {
    if (_.some(this.state.entryResults, (value) => { return value !== 0; })) {
      this.props.createEntry({ results: this.state.entryResults });
      this.setState({ entryResults: this.initialEntryResults() });
    }
  }
  renderGoalEntryInputs() {
    return this.props.goals.map((goal) => {
      return (<GoalEntryInput
        key={goal.id}
        goal={goal}
        selectedValue={this.state.entryResults[goal.id]}
        selectValue={this.setSelectedValueForGoal.bind(this)}
      />);
    });
  }
  render() {
    return (
      <Card
        buttonText="Add Entry"
        onButtonPress={this.submit.bind(this)}
      >
        {this.renderGoalEntryInputs()}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goals: _.filter(state.goals, (goal) => { return goal.hide !== true; }),
    entries: state.entries,
  };
};

export default connect(mapStateToProps, { createEntry })(EntryForm);
