import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
// import { Scene, Router, Actions } from 'react-native-router-flux';
import Loading from './components/Loading';
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

    if (initialScene === null) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <Router
        sceneStyle={{ paddingTop: 64 }}
        navigationBarStyle={navBarStyle}
        titleStyle={navBarTitleStyle}
        leftButtonIconStyle={{ tintColor: '#FFF' }}
      >
        <Scene key="loading" sceneStyle={{ paddingTop: 0 }} component={Loading} hideNavBar initial />
        <Scene key="welcome" sceneStyle={{ paddingTop: 0 }} component={Welcome} hideNavBar />
        <Scene key="home" component={Home} title="Accountabuddy" />
        <Scene key="entries" component={Entries} title="Accountabuddy" />
        <Scene key="settings" component={Settings} title="Accountabuddy" />
        <Scene key="stats" component={Stats} title="Accountabuddy" />
        <Scene key="signIn" component={SignIn} title="Accountabuddy" />
        <Scene key="newGoals" component={EditGoals} title="Goals" />
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

export default RouterComponent;
