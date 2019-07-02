import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { AppNavigator } from 'AppNavigation';
import rootReducer from './redux/reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}