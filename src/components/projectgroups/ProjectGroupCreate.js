import React, {Component} from 'react';
import {connect} from 'react-redux';
import { projectService, projectGroupService} from '../../services/EntityServices'
import {ProjectGroupActions} from '../../actions/ActionTypes'
import ProjectGroup from '../../models/ProjectGroup'
import {Link} from 'react-router'

class ProjectCreate extends Component {

   componentWillMount()
   {
      this.props.getAllProjects();

      if (this.props.params.id)
      {
         this.props.getOne(this.props.params.id)
      }
      else
      {
         this.props.createNew();
      }
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
      let projectgroup = new ProjectGroup().copy(this.props.projectgroup);
      if (projectgroup.isValid())
      {
         if (projectgroup.id)
         {
            this.props.update(projectgroup)
         }
         else
         {
            this.props.save(projectgroup)
         }
      }
   }

   componentWillUnmount()
   {
      this.props.clearAll();
   }

   handleChange(e)
   {
      let projectgroup = new ProjectGroup().copy(this.props.projectgroup);


      if( e.target.type === 'checkbox')
      {
         let pid = parseInt(e.target.value, 10);
         if( e.target.checked )
         {
            // remove just incase :S
            projectgroup.projects = projectgroup.projects.filter(function(proj){ return proj.id !== pid });
            //now add new one
            projectgroup.projects.push(this.props.projects.find( function(proj){  return proj.id === pid  }));
         }
         else
         {
            projectgroup.projects = projectgroup.projects.filter(function(proj){ return proj.id !== pid })
         }
      }

      /*
      if(e.target.id === 'credentials')
      {
         let targetValue = parseInt(e.target.value, 10);

         if( targetValue ===  -1)
         {
            project.credentials = null;
         }
         else
         {

            project.credentials = this.props.credentials.find(function(cred){ return cred.id === targetValue})
         }
      }
      else*/
      projectgroup[e.target.id] = e.target.value;

      this.props.propertyUpdated(projectgroup);
   }


   render()
   {
      if (!this.props.projectgroup && !this.props.err)
      {
         return <div>Loading</div>
      }

      let title = this.props.existing ? ("Editing " + this.props.projectgroup.name) : "Creating New Project Group"


      let projects = this.props.projects.map( (project) => {
         return (
            <div key={project.id} className="checkbox">
               <label>
                  <input type="checkbox" value={project.id} checked={ this.props.projectgroup.projects.find((proj)=> proj.id === project.id )    }/>
                     {project.name}
               </label>
            </div>
         );
      });

      //let selectedCred = this.props.project.credentials ? this.props.project.credentials.id : -1;

      return (
         <div onChange={this.handleChange.bind(this) }>
            <div className="page-header">
               <h3>{title}</h3>
            </div>

            <div className="form-group">
               <label>Name</label>
               <input className="form-control" type="text" value={this.props.projectgroup.name} id="name"/>
            </div>

            <div className="form-group">
               <label>Projects</label>
               {projects}
            </div>


            <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>
            <Link to="/projectgroups" className="btn btn-info">Cancel</Link>

         </div>
      );
   }
}

function mapStateToProps(state)
{
   return {
      projectgroup: state.activeProjectGroup.projectgroup,
      err: state.activeProjectGroup.err,
      saved: state.activeProjectGroup.saved,
      existing: state.activeProjectGroup.projectgroup && state.activeProjectGroup.projectgroup.id,
      projects: state.projects.projects
   };
}

function mapDispatchToProps( dispatch, state )
{
   return {
      clearAll: () => dispatch({type: ProjectGroupActions.CLEAR_ALL }),
      getOne: projectGroupService.getOne( dispatch, state),
      save: projectGroupService.saveAction(dispatch, state),
      update: projectGroupService.updateAction(dispatch, state),
      createNew: () =>
      {
         dispatch({type: ProjectGroupActions.CREATE_NEW, payload: new ProjectGroup()})
      },
      propertyUpdated: (projectgroup) =>
      {
         dispatch({type: ProjectGroupActions.PROPERTY_UPDATED, payload: projectgroup})
      },
      getAllProjects: projectService.getAll(dispatch, state)
   }
}


export default connect( mapStateToProps, mapDispatchToProps)( ProjectCreate )
