import React, { Component } from 'react';
import Card from './common/Card';
import GoalEntryInput from './GoalEntryInput';

class EntryForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.goals = [
      { id: 1, text: 'Sensible portions' },
      { id: 2, text: 'No sugary drinks' },
      { id: 3, text: '1/4 carbs or less' },
      { id: 4, text: '2 glasses of water' },
      { id: 5, text: 'No beer' },
    ];

    this.state = {
      goalResults: this.initialGoalResults(),
    };
    console.log(this.state);
  }
  initialGoalResults() {
    console.log('blah hey goals', this.goals);
    return this.goals.reduce((acc, goal) => {
      console.log('blah goal', goal);
      acc = acc || {}
      acc[goal.id] = 0;
      return acc;
    });
  }
  renderGoalEntryInputs() {
    return this.goals.map((goal) => {
      return <GoalEntryInput key={goal.id} goal={goal} selectedValue={this.state.goalResults[goal.id]} />;
    });
  }
  render() {
    return (
      <Card headerText="New Entry">
        {this.renderGoalEntryInputs()}
      </Card>
    );
  }
}

export default EntryForm;
