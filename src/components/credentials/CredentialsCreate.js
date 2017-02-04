import React, {Component} from 'react';
import {connect} from 'react-redux';
import Credential from '../../models/Credential'
import {CredentialActions} from '../../actions/ActionTypes'
import {credentialsService} from '../../services/EntityServices'
import {Link} from 'react-router'

class CredentialsCreate extends Component {

   componentWillMount()
   {
      if (this.props.params.id)
      {
         this.props.getOne(this.props.params.id)
      }
      else
      {
         this.props.createNew();
      }
   }

   componentWillUnmount()
   {
      this.props.clearAll();
   }

   handleChange(e)
   {
      let cred = new Credential().copy(this.props.credential);
      cred[e.target.id] = e.target.value;
      this.props.propertyUpdated(cred);
   }


   componentWillReceiveProps(nextProps)
   {
      if (nextProps.existing && !nextProps.params.id)
      {
         this.props.createNew();
      }
   }

   handleSave()
   {
      let cred = this.props.credential;
      if (cred.isValid())
      {
         if (cred.id)
         {
            this.props.update(cred)
         }
         else
         {
            this.props.save(cred)
         }
      }
   }

   render()
   {


      if (!this.props.credential && !this.props.err)
      {
         return null;
      }

      let title = this.props.existing ? ("Editing Credential " + this.props.credential.name) : "Creating New Credential"

      return (

         <div>

            <div className="pomPageHeader">
               <h3 >{title}</h3>
            </div>

            <div onChange={this.handleChange.bind(this) }>


               <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" type="text" value={this.props.credential.name} id="name"/>
               </div>
               <div className="form-group">
                  <label>Protocol</label>
                  <select className="form-control" value={this.props.credential.protocol} id="protocol">
                     <option>http</option>
                     <option>https</option>
                  </select>
               </div>
               <div className="form-group">
                  <label>Host</label>
                  <input className="form-control" type="text" value={this.props.credential.host} id="host"/>
               </div>
               <div className="form-group">
                  <label>Port</label>
                  <input className="form-control" type="text" value={this.props.credential.port} id="port"/>
               </div>
               <div className="form-group">
                  <label>Username</label>
                  <input className="form-control" type="text" value={this.props.credential.username}
                         id="username"/>
               </div>
               <div className="form-group">
                  <label>Password</label>
                  <input className="form-control" type="password" value={this.props.credential.password}
                         id="password"/>
               </div>

               <div>
                  <span className="pull-right">
                     <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>
                     <Link to="/credentials" className="btn btn-info" style={{marginLeft:'5px'}}>Cancel</Link>
                  </span>
               </div>
            </div>
         </div>
      );
   }
}


function mapStateToProps(state)
{
   return {
      credential: state.credentials.credential,
      err: state.credentials.err,
      saved: state.credentials.saved,
      existing: state.credentials.credential && state.credentials.credential.id
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      clearAll: () => dispatch({type: CredentialActions.CLEAR_ALL, payload: null}),
      getOne: credentialsService.getOne(dispatch, state),
      save: credentialsService.saveAction(dispatch, state),
      update: credentialsService.updateAction(dispatch, state),
      createNew: () =>
      {
         dispatch({type: CredentialActions.CREATE_NEW, payload: new Credential()})
      },
      propertyUpdated: (credential) =>
      {
         dispatch({type: CredentialActions.PROPERTY_UPDATED, payload: credential})
      },
      resetAlerts: () =>
      {
         dispatch({type: CredentialActions.RESET_ALERTS, payload: null})
      }
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsCreate);
