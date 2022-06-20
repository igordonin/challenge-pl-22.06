import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { App } from './app';
import { reducers } from './reducers';
import { LandingPage } from './components/landing-page';
import { SignUp } from './modules/auth/sign-up';

const store = createStore(reducers, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.querySelector('#root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
