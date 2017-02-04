import React, {Component} from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import './app.css'
import Alert from './components/Alert'



class App extends Component
{

   buildAlerts()
   {
      if( this.props.alerts.length > 0 )
      {
         let clearAlert = this.props.clearAlert;
         let lis = this.props.alerts.map( (alert)=>{
            setTimeout( function(){
               clearAlert(alert.id)
            }, 5000);
            return <div key={alert.id}><Alert type={alert.type} msg={alert.msg}/></div>
         } )

         return lis
      }
      return null;
   }

   render()
   {


      return (
         <div>
            {/* open app root */}


            <nav className="navbar navbar-inverse navbar-static-top">
               <div className="container">
                  <div className="navbar-header">
                     <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                             data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                     </button>
                     <Link className="navbar-brand" to="/">Versions</Link>
                  </div>
                  <div id="navbar" className="navbar-collapse collapse">
                     <ul className="nav navbar-nav">
                        <li><Link to="/credentials" activeClassName="active">Credentials</Link></li>
                        <li><Link to="/projects" activeClassName="active">Projects</Link></li>
                        <li><Link to="/projectgroups" activeClassName="active">Project Groups</Link></li>
                     </ul>
                  </div>
               </div>
            </nav>



            <div className="container">
               { this.buildAlerts() }
               { this.props.children }
            </div>


            {/* close app root*/}
         </div>
      );
   }
}

function mapStateToProps( state )
{
   return {
      alerts: state.alerts.alerts,
   }
}

function mapDispatchToProps( dispatch, state )
{
   return {
      clearAlert: ( id )=> dispatch({ type:'CLEAR_ALERT', payload: id  })
   }
}

export default connect( mapStateToProps, mapDispatchToProps )(App)
