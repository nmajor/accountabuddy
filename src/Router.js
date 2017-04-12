import React from 'react';
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

const RouterComponent = () => {
  const {
    navBarStyle,
    navBarTitleStyle,
  } = styles;

  return (
    <Router
      sceneStyle={{ paddingTop: 64 }}
      navigationBarStyle={navBarStyle}
      titleStyle={navBarTitleStyle}
    >
      <Scene key="home" component={Home} title="Accountabuddy" initial />
      <Scene key="entries" component={Entries} title="Accountabuddy" />
      <Scene key="settings" component={Settings} title="Accountabuddy" />
      <Scene key="stats" component={Stats} title="Accountabuddy" />
      <Scene key="welcome" component={Welcome} title="Accountabuddy" />
      <Scene key="signIn" component={SignIn} title="Accountabuddy" />
      <Scene key="editGoals" component={EditGoals} title="Accountabuddy" />
    </Router>
  );
};

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

export default RouterComponent;
