import React, { Component } from 'react';
import { AsyncStorage, View, Text, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import Loading from './components/Loading';

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
    if (!this.state.rehydrated) {
      return Loading;
    }

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
