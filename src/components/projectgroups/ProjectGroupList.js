import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {projectGroupService} from '../../services/EntityServices';
import GenericListComponent from '../GenericListComponent'

class ProjectGroupList extends Component {

   componentWillMount()
   {
      this.props.getList();
   }

   render()
   {
      return(
         <div>

            <div className="row page-header">
               <div className="col-xs-11">
                  <h3>Project Groups</h3>
               </div>
               <div className="col-xs-1">
                  <Link to="/projectgroups/create" className="btn btn-primary">New</Link>
               </div>
            </div>


            <div className="row">
               <div className="col">
                  <GenericListComponent
                     items={this.props.projectGroups}
                     keyattr="id"
                     display="name"
                     linkto="/projectgroups/create/"
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
      projectGroups: state.projectgroups.list.projectgroups,
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      getList: projectGroupService.getAll(dispatch, state)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectGroupList)