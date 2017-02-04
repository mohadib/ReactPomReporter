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


   handleDelete()
   {
      if( confirm("Are you sure "))
      {
         this.props.delete(this.props.projectgroup.id);
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

         if( e.target.id === 'isDefault')
         {
            projectgroup.isDefault = e.target.checked
         }
         else {

            let pid = parseInt(e.target.value, 10);
            if (e.target.checked) {
               // remove just incase :S
               projectgroup.projects = projectgroup.projects.filter(function (proj) {
                  return proj.id !== pid
               });
               //now add new one
               projectgroup.projects.push(this.props.projects.find(function (proj) {
                  return proj.id === pid
               }));
            }
            else {
               projectgroup.projects = projectgroup.projects.filter(function (proj) {
                  return proj.id !== pid
               })
            }
         }
      }
      else projectgroup[e.target.id] = e.target.value;

      this.props.propertyUpdated(projectgroup);
   }


   render()
   {
      if (!this.props.projectgroup && !this.props.err)
      {
         return null;
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

            <div className="pomPageHeader">
               <h3>{title}</h3>
               { this.props.existing &&
                  <span>
                     <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                  </span>
               }
            </div>


            <div className="form-group">
               <label>Name</label>
               <input className="form-control" type="text" value={this.props.projectgroup.name} id="name"/>
            </div>

            <div className="form-group">
               <div className="checkbox">
                  <label>
                     <input type="checkbox" id='isDefault' checked={this.props.projectgroup.isDefault}/>
                     Make Default
                  </label>
               </div>
            </div>

            <div className="form-group">
               <label>Projects</label>
               {projects}
            </div>

            <div>
               <span className="pull-right">
                  <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>
                  <Link to="/projectgroups" className="btn btn-info" style={{marginLeft:'5px'}}>Cancel</Link>
               </span>
            </div>

         </div>
      );
   }
}

function mapStateToProps(state)
{
   return {
      projectgroup: state.projectgroups.projectgroup,
      err: state.projectgroups.err,
      saved: state.projectgroups.saved,
      existing: state.projectgroups.projectgroup && state.projectgroups.projectgroup.id,
      projects: state.projects.list.projects
   };
}

function mapDispatchToProps( dispatch, state )
{
   return {
      clearAll: () => dispatch({type: ProjectGroupActions.CLEAR_ALL }),
      getOne: projectGroupService.getOne( dispatch, state),
      save: projectGroupService.saveAction(dispatch, state),
      update: projectGroupService.updateAction(dispatch, state),
      delete: projectGroupService.deleteAction(dispatch, state),
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
