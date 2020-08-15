import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Styles/materialize.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux';
import rootReducer from './Store/Recuders/RootReducer';
import thunk from 'redux-thunk';
import axios from 'axios'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(
        applyMiddleware(thunk)
));

axios.defaults.baseURL = 'http://localhost:8080';

const app = (<Provider store={store}>
                <BrowserRouter>
                        <App />
                </BrowserRouter>
            </Provider>);
ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
