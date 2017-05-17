import React, {Component} from 'react';
import InfoDisplay from '../InfoDisplay'

class ProjectGroupDisplay extends Component
{
   render()
   {
      return (
          <div>
            <h2>{this.props.projectgroup.name}</h2>
            <div className="list-group">
               { this.props.projectgroup.projects.map( ( project )=> {
                  if( !project.projectInfo)
                  {
                     return <div key={project.id}>No SVN info for {project.name} yet.</div>
                  }
                  return <InfoDisplay key={project.id} project={ project } />
               })}
            </div>
          </div>
      );
   }

}

export default ProjectGroupDisplay