import React, {Component} from 'react';
import {connect} from 'react-redux';
import { projectGroupService } from '../../services/EntityServices'
import ProjectGroupDisplay from '../projectgroups/ProjectGroupDisplay'
import {DisplayedGroup} from '../../actions/ActionTypes'

class VersionsIndex extends Component {

   componentWillMount()
   {
      this.props.getList();
   }

   getContents()
   {
      let group = this.props.selectedGroup;
      if(!group)
      {
         let def = this.props.projectGroups.find((pg) => pg.isDefault);
         if( def )
         {
            this.props.select( def );
         }
         else return <div>Set up a default project group or use group selector.</div>
      }
      else
      {
         return <ProjectGroupDisplay projectgroup={group}/>
      }
   }

   handleClick(e)
   {
      const gid = parseInt(e.target.id, 10)
      this.props.select(  this.props.projectGroups.find((pg) => pg.id === gid) )
   }


   render()
   {
      let content = this.getContents();

      if(!content)
      {
         return (<div>Loading</div>);
      }

      return (
          <div>

             <div className="page-header" style={{marginTop:'0px' }}>
                <h3 style={{display: 'inline-block', paddingLeft:'10px'}}>API Versions</h3>

                <span className="dropdown pull-right" style={{marginTop:'20px'}}>
                   <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                      Select Group &nbsp;&nbsp;
                      <span className="caret"></span>
                   </button>
                   <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                      {
                         this.props.projectGroups.map((group)=>{
                            return <li key={group.name}><a onClick={this.handleClick.bind(this)} id={group.id}>{group.name}</a></li>
                         })
                      }
                   </ul>
                </span>

             </div>



             { content }
          </div>
      );
   }
}

function mapStateToProps(state)
{
   return {
      projectGroups: state.projectgroups.list.projectgroups,
      selectedGroup: state.displayedgroup.selected
   };
}

function mapDispatchToProps(dispatch, state)
{
   return {
      getList: projectGroupService.getAll(dispatch, state),
      select: ( group )=> {  dispatch({ type:DisplayedGroup.GROUP_SELECTED, payload:group  }) }
   };
}


export default connect(mapStateToProps, mapDispatchToProps)(VersionsIndex)
