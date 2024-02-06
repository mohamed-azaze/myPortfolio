import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import { Provider } from "react-redux"
import store from "./Store/index"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <ContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />

      </Provider>

    </ContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

