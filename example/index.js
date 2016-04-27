import React from 'react'
import { render  } from 'react-dom'
import { Provider  } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'
require('todomvc-app-css/index.css')
// require('file?name=index.html!./index.pug')
// import 'todomvc-app-css/index.css'

const store = configureStore();

render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root')

)
