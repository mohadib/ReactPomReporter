import React, {Component} from 'react';

class InfoDisplay extends Component
{
   formatDate(info)
   {
      return new Date(info.lastUpdated).toLocaleDateString();
   }

   render()
   {
      let project = this.props.project;
      let info = project.svnInfo;
      let rawLogs = info.logEntries;
      let entries = '';
      if( rawLogs )
      {
         entries = rawLogs.split("<EOL>").filter((e)=> e.trim().length>0);
      }
      let x = 1;

      return (

         <div key={info.id} className="list-group-item">

            <div><h3>{project.name}</h3></div>
            <div><b>Api Version: {info.xpathResult}</b></div>
            <div>Last Checked: { this.formatDate(info)}</div>
            <div>Svn Version: {info.svnRevision}</div>
            <div>URL: <a target="_new" href={info.projectUrl}>{info.projectUrl}</a></div>

            <div style={{marginTop:'10px'}}>
               <ul className="small" style={{padding:'10px', listStyle:'none'}}>
                  {entries.map((e)=> <li key={x++} >{e}</li>)}
               </ul>
            </div>
         </div>
      );
   }
}
export default InfoDisplay