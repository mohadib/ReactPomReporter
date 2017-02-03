import React, {Component} from 'react';
import {connect} from 'react-redux';
import { projectService, credentialsService} from '../../services/EntityServices'
import {ProjectActions} from '../../actions/ActionTypes'
import Project from '../../models/Project'
import {Link} from 'react-router'

class ProjectCreate extends Component {

   componentWillMount()
   {
      this.props.getAllCreds();

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
      let project = new Project().copy(this.props.project);
      if (project.isValid())
      {
         if (project.id)
         {
            this.props.update(project)
         }
         else
         {
            this.props.save(project)
         }
      }
   }

   componentWillUnmount()
   {
      this.props.clearAll();
   }

   handleChange(e)
   {
      let project = new Project().copy(this.props.project);

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
      else project[e.target.id] = e.target.value;

      this.props.propertyUpdated(project);
   }


   render()
   {
      if (!this.props.project && !this.props.err)
      {
         return <div>Loading</div>
      }

      let title = this.props.existing ? ("Editing " + this.props.project.name) : "Creating New Project"


      let creds = this.props.credentials.map( (cred) => {
         return <option key={cred.id} value={cred.id} >{cred.name}</option>
      }).concat(<option key='-1' value='-1' >Please select..</option>)

      let selectedCred = this.props.project.credentials ? this.props.project.credentials.id : -1;

      return (
            <div onChange={this.handleChange.bind(this) }>
               <div className="page-header">
                  <h3>{title}</h3>
               </div>

               <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" type="text" value={this.props.project.name} id="name"/>
               </div>

               <div className="form-group">
                  <label>Path</label>
                  <input className="form-control" type="text" value={this.props.project.path} id="path"/>
               </div>

               <div className="form-group">
                  <label>XPath Expression</label>
                  <input className="form-control" type="text" value={this.props.project.xpathExpression} id="xpathExpression"/>
               </div>

               <div className="form-group">
                  <label>Credentials</label>
                  <select className="form-control" id="credentials" value={selectedCred}>
                     {creds}
                  </select>
               </div>


               <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>
               <Link to="/projects" className="btn btn-info">Cancel</Link>

            </div>
      );
   }
}

function mapStateToProps(state)
{
   return {
      project: state.activeProject.project,
      err: state.activeProject.err,
      saved: state.activeProject.saved,
      existing: state.activeProject.project && state.activeProject.project.id,
      credentials: state.credentials.credentials
   };
}

function mapDispatchToProps( dispatch, state )
{
   return {
      clearAll: () => dispatch({type: ProjectActions.CLEAR_ALL }),
      getOne: projectService.getOne( dispatch, state),
      getAllCreds: credentialsService.getAll(dispatch, state),
      save: projectService.saveAction(dispatch, state),
      update: projectService.updateAction(dispatch, state),
      createNew: () =>
      {
         dispatch({type: ProjectActions.CREATE_NEW, payload: new Project()})
      },
      propertyUpdated: (project) =>
      {
         dispatch({type: ProjectActions.PROPERTY_UPDATED, payload: project})
      },
   }
}


export default connect( mapStateToProps, mapDispatchToProps)( ProjectCreate )