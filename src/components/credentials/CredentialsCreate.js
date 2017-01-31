/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Credential from '../../models/Credential'
import { CredentialActions } from '../../actions/ActionTypes'
import { saveActionCreator } from '../../services/CredentialsService'

class CredentialsCreate extends Component {

   componentWillMount()
   {
      this.props.createNew();
   }

   handleChange(e)
   {
      let cred = new Credential().copy( this.props.credential );
      cred[e.target.id] = e.target.value;
      this.props.propertyUpdated( cred );
   }


   handleSave()
   {
      let cred = this.state.credential;
      if( cred.isValid() )
      {
         this.props.saveOrUpdate( cred );
      }
   }

   render()
   {
      if(!this.props.credential )
      {
         return (<div/>)
      }

      return (
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
                <input className="form-control" type="text" value={this.props.credential.username} id="username"/>
             </div>
             <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" value={this.props.credential.password} id="password"/>
             </div>

             <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>

         </div>
      );
   }
}


function mapStateToProps( state )
{
   return {
      credential : state.credential
   };
}

function mapDispatchToProps( dispatch, state )
{
   return{
      saveOrUpdate : saveActionCreator( dispatch, state ),
      createNew : () => { dispatch({ type: CredentialActions.CREATE_NEW, payload: new Credential() }) },
      propertyUpdated : ( credential ) => { dispatch({ type:CredentialActions.PROPERTY_UPDATED, payload:credential }) }
   };
}

export default connect( mapStateToProps, mapDispatchToProps )(CredentialsCreate);
