import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router'

class App extends Component {
   render()
   {
      return (
          <div>
             {/* open app root */}


             <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                   <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                         <span className="sr-only">Toggle navigation</span>
                         <span className="icon-bar"></span>
                         <span className="icon-bar"></span>
                         <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">Versions</a>
                   </div>
                   <div id="navbar" className="collapse navbar-collapse">
                      <ul className="nav navbar-nav">
                         <li><Link to="/credentials" activeClassName="active">List</Link></li>
                         <li><Link to="/credentials/update" activeClassName="active">Update</Link></li>
                         <li><Link to="/credentials/create" activeClassName="active">Create</Link></li>
                      </ul>
                   </div>
                </div>
             </nav>

             <div className="container" style={{paddingTop: 80 + 'px'}}>
                { this.props.children }
             </div>




             {/* close app root*/}
          </div>
      );
   }
}

export default App;
