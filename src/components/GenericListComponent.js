import React, {Component} from 'react'
import {Link} from 'react-router'

class GenericListComponent extends Component {

   render()
   {
      let that = this;
      return (
         <ul className="list-group">
            {
               this.props.items.map((cred) =>
               {
                  return(
                  <li key={cred[that.props.keyattr]} className="list-group-item">
                     <Link to={`${that.props.linkto}${cred[that.props.keyattr]}`}>
                        {cred[this.props.display]}
                     </Link>
                  </li>
                  );
               })
            }
         </ul>
      );
   }

}

export default GenericListComponent