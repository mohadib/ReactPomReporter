/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link } from 'react-router'
import { credentialsService } from '../../services/EntityServices'
import GenericListComponent from '../GenericListComponent'

class CredentialsList extends Component {

   componentWillMount()
   {
      this.props.getList();
   }

   render()
   {
      return (
         <div>

            <div className="pomPageHeader">
               <h3 >Credentials</h3>
               <span>
                  <Link to="/credentials/create" className="btn btn-primary">New</Link>
               </span>
            </div>

            <div className="row">
               <div className="col">
                  <GenericListComponent
                     items={this.props.credentials}
                     keyattr="id"
                     display="name"
                     linkto="/credentials/create/"
                  />
               </div>
            </div>

         </div>
      );
   }
}


function mapStateToProps(state)
{
   return {
      credentials: state.credentials.list.credentials,
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      getList: credentialsService.getAll(dispatch, state)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsList)