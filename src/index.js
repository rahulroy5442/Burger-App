import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {Provider} from 'react-redux'
import reducer from './store/reducer/reducer'
import reducer1 from './store/reducer/reducer1';
import Auth from './store/reducer/Auth'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import {sagaAuth} from './store/saga/index'
const composeEnhancers =process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;

const rootReducer = combineReducers({
    burgerBuilder: reducer,
    order:reducer1,
    Auth:Auth
});
const SagemiddleWare=createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk,SagemiddleWare)
));
SagemiddleWare.run(sagaAuth)

ReactDOM.render(

  <Provider store={store}>
  <React.StrictMode>
<BrowserRouter basename="App-new" >
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
