import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as storeFile from './store/store';
import App from './App';
import { BrowserRouter }from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

const finalApp = (
    <BrowserRouter>
            <Provider store={storeFile.store}>
                <PersistGate loading={null} persistor={storeFile.persistor}>
                    <App />
                </PersistGate>
            </Provider>
    </BrowserRouter>
);
ReactDOM.render(finalApp, document.getElementById('root'));
