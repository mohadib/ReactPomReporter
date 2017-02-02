/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Credential from '../../models/Credential'
import {CredentialActions} from '../../actions/ActionTypes'
import {saveActionCreator, updateActionCreator, getOne} from '../../services/CredentialsService'
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
         return <div>Loading</div>
      }

      let title = this.props.existing ? ("Editing " + this.props.credential.name) : "Creating New Credential"

      return (

         <div>
            <div className="page-header">
               <h3>{title}</h3>
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

               <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>
               <Link to="/credentials/list" className="btn btn-info">Cancel</Link>
            </div>
         </div>
      );
   }
}


function mapStateToProps(state)
{
   return {
      credential: state.active.credential,
      err: state.active.err,
      saved: state.active.saved,
      existing: state.active.credential && state.active.credential.id
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      clearAll: () => dispatch({type: CredentialActions.CLEAR_ALL, payload: null}),
      getOne: getOne(dispatch, state),
      save: saveActionCreator(dispatch, state),
      update: updateActionCreator(dispatch, state),
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
