import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import configureStore from './configureStore';
import i18n from './i18n'
import AutoLogoutTimer from './components/shared/auto-logout-timer';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
        <AutoLogoutTimer ComposedClass={App}/>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
