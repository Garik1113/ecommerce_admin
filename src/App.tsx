import React from 'react';
import { Provider } from 'react-redux'
import store from './store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import Main from 'components/Main';
export const history = createBrowserHistory();

const App = () => {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Main/>
            </Router>
        </Provider>
    )
}

export default App;