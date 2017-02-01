import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute } from 'react-router'

import CredentialsIndex from './components/credentials/CredentialsIndex'
import CredentialsCreate from './components/credentials/CredentialsCreate'
import CredList from './components/credentials/CredList'

import App from './App';
import store from './store'
import { Provider } from 'react-redux'


ReactDOM.render(
   <Provider store={store}>
      <Router history={ browserHistory }>
         <Route path="/" component={App}>
            <Route path="/credentials" component={CredentialsIndex}>
               <IndexRoute component={CredList} />
               <Route path="create(/:id)" component={CredentialsCreate}/>
               <Route path="list" component={CredList}/>
            </Route>
         </Route>
      </Router>
   </Provider>,
  document.getElementById('root')
);
