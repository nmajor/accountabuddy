import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
// import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './components/Home';
import Entries from './components/Entries';
import Settings from './components/Settings';
import Stats from './components/Stats';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import EditGoals from './components/EditGoals';
import { primaryColor, primaryColorDark } from './styleVars';

class RouterComponent extends Component {
  render() {
    const { initialScene } = this.props;

    const {
      navBarStyle,
      navBarTitleStyle,
    } = styles;

    return (
      <Router
        sceneStyle={{ paddingTop: 64 }}
        navigationBarStyle={navBarStyle}
        titleStyle={navBarTitleStyle}
        leftButtonIconStyle={{ tintColor: '#FFF' }}
      >
        <Scene key="home" component={Home} title="Accountabuddy" />
        <Scene key="entries" component={Entries} title="Accountabuddy" />
        <Scene key="settings" component={Settings} title="Accountabuddy" />
        <Scene key="stats" component={Stats} title="Accountabuddy" />
        <Scene key="signIn" component={SignIn} title="Accountabuddy" />
        <Scene key="newGoals" component={EditGoals} title="Goals" initial={initialScene === 'newGoals'} />
        <Scene key="editGoals" component={EditGoals} title="Edit Goals" />
        <Scene key="welcome" sceneStyle={{ paddingTop: 0 }} component={Welcome} hideNavBar initial={initialScene === 'welcome'} />
      </Router>
    );
  }
}

const styles = {
  navBarStyle: {
    backgroundColor: primaryColor,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    borderBottomColor: primaryColorDark,
    borderBottomWidth: 1,
  },
  navBarTitleStyle: {
    color: '#FFF',
  },
};

const mapStateToProps = (state) => {
  let initialScene = null;

  if (!state.welcomed) {
    initialScene = 'welcome';
  } else if (state.goals.length === 0) {
    initialScene = 'newGoals';
  }

  initialScene = 'welcome';


  return { initialScene };
};

export default connect(mapStateToProps)(RouterComponent);
