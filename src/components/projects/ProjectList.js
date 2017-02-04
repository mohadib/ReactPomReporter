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

            <div className="pomPageHeader">
               <h3 >Projects</h3>
               <span>
                  <Link to="/projects/create" className="btn btn-primary">New</Link>
               </span>
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