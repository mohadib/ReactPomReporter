import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute } from 'react-router'

import CredentialsList from './components/credentials/CredentialsList'
import CredentialsUpdate from './components/credentials/CredentialsUpdate'
import CredentialsIndex from './components/credentials/CredentialsIndex'
import CredentialsCreate from './components/credentials/CredentialsCreate'

import App from './App';
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
   <Provider store={store}>
      <Router history={ browserHistory }>
         <Route path="/" component={App}>
            <Route path="/credentials" component={CredentialsIndex}>
               <IndexRoute component={CredentialsList}/>
               <Route path="update" component={CredentialsUpdate}/>
               <Route path="create(/:id)" component={CredentialsCreate}/>
               <Route path="list" component={CredentialsList}/>
            </Route>
         </Route>
      </Router>
   </Provider>,
  document.getElementById('root')
);
