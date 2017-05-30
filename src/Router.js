import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
// import Loading from './components/Loading';
import Home from './components/Home';
import Entries from './components/Entries';
import Settings from './components/Settings';
import AdminSettings from './components/AdminSettings';
import Stats from './components/Stats';
import Welcome from './components/Welcome';
import SignIn from './components/SignIn';
import EditGoals from './components/EditGoals';
import { primaryColor, primaryColorDark } from './styleVars';

class RouterComponent extends Component {
  shouldComponentUpdate() {
    return false;
  }
  isInitial(key) {
    return this.props.initialScene === key;
  }
  render() {
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
        <Scene key="welcome" sceneStyle={{ paddingTop: 0 }} component={Welcome} hideNavBar initial={this.isInitial('welcome')} />
        <Scene key="home" component={Home} title="Meal Meter" initial={this.isInitial('home')} />
        <Scene key="entries" component={Entries} title="Meal Meter" />
        <Scene key="settings" component={AdminSettings} title="Meal Meter" />
        <Scene key="stats" component={Stats} title="Meal Meter" />
        <Scene key="signIn" component={SignIn} title="Meal Meter" />
        <Scene key="newGoals" component={EditGoals} title="Goals" initial={this.isInitial('newGoals')} />
        <Scene key="editGoals" component={EditGoals} title="Edit Goals" />
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

const mapStateToProps = ({ welcomed, goals }) => {
  let initialScene = 'home';

  if (!welcomed) {
    initialScene = 'welcomed';
  } else if (goals.length === 0) {
    initialScene = 'newGoals';
  }

  return { initialScene };
};

export default connect(mapStateToProps)(RouterComponent);
