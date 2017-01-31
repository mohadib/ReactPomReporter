/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';

class CredentialsIndex extends Component {
   render()
   {
      return (
          <div className="container">
             { this.props.children }
          </div>
      );
   }
}

export default CredentialsIndex;