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
                  if( !project.svnInfo)
                  {
                     return <div key={project.id}>Loading</div>
                  }
                  return <InfoDisplay key={project.id} project={ project } />
               })}
            </div>
          </div>
      );
   }

}

export default ProjectGroupDisplay