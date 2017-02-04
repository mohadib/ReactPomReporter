import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {projectService} from '../../services/EntityServices';
import GenericListComponent from '../GenericListComponent'

class ProjectList extends Component {

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
                  <h3>Projects</h3>
               </div>
               <div className="col-xs-1">
                  <Link to="/projects/create" className="btn btn-primary">New</Link>
               </div>
            </div>


            <div className="row">
               <div className="col">
                  <GenericListComponent
                     items={this.props.projects}
                     keyattr="id"
                     display="name"
                     linkto="/projects/create/"
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
      projects: state.projects.list.projects,
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      getList: projectService.getAll(dispatch, state)
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList)