import rest from './REST';
import Credential from '../models/Credential'
import Project from '../models/Project'
import ProjectGroup from '../models/ProjectGroup'
import { CredentialActions, ProjectActions, ProjectGroupActions } from '../actions/ActionTypes'


let credentialsService = rest( "/credentials",  CredentialActions, function( data ){
     return new Credential().copy(data);
});

let projectService = rest( "/projects",  ProjectActions, function( data ){
   return new Project().copy(data);
});

let projectGroupService = rest( "/projectgroups", ProjectGroupActions, function( data){
   return new ProjectGroup().copy(data);
});

export { credentialsService, projectService, projectGroupService }