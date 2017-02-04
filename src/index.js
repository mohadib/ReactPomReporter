import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {Router, Route, browserHistory, IndexRoute } from 'react-router'

import Index from './components/Index'

import CredentialsCreate from './components/credentials/CredentialsCreate'
import CredentialList from './components/credentials/CredentialsList'

import ProjectList from './components/projects/ProjectList'
import ProjectCreate from './components/projects/ProjectCreate'

import ProjectGroupList from './components/projectgroups/ProjectGroupList'
import ProjectGroupCreate from './components/projectgroups/ProjectGroupCreate'

import VersionsIndex from './components/versions/VersionsIndex'

import App from './App';
import store from './store'



ReactDOM.render(
   <Provider store={store}>
      <Router history={ browserHistory }>
         <Route path="/" component={App}>
            <IndexRoute component={VersionsIndex}/>
            <Route path="/credentials" component={Index}>
               <IndexRoute component={CredentialList} />
               <Route path="create(/:id)" component={CredentialsCreate}/>
               <Route path="list" component={CredentialList}/>
            </Route>
            <Route path="/projects" component={Index}>
               <IndexRoute component={ProjectList} />
               <Route path="create(/:id)" component={ProjectCreate}/>
               <Route path="list" component={ProjectList}/>
            </Route>
            <Route path="/projectgroups" component={Index}>
               <IndexRoute component={ProjectGroupList} />
               <Route path="list" component={ProjectGroupList}/>
               <Route path="create(/:id)" component={ProjectGroupCreate}/>
            </Route>
         </Route>
      </Router>
   </Provider>,
  document.getElementById('root')
);
