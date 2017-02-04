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

            <div className="pomPageHeader">
               <h3>Project Groups</h3>
               <span>
                  <Link to="/projectgroups/create" className="btn btn-primary">New</Link>
               </span>
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