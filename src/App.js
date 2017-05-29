import React, { Component } from 'react';
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(ReduxThunk),
    autoRehydrate(),
  ),
);

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, { storage: AsyncStorage }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    const { containerStyles, textStyle } = styles;

    if (!this.state.rehydrated) {
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

    return (
      <Provider store={store}>
        <Router />
      </Provider>
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

export default App;
