import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Router from '../config/router';
import reducers from '../reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);


export default class App extends Component {
  render() {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <MuiThemeProvider >
                <Router/>
            </MuiThemeProvider>
        </Provider>
    );
  }
}
