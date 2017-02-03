import React, {Component} from 'react';

class Index extends Component {
   render()
   {
      return (
         <div className="container">
            { this.props.children }
         </div>
      );
   }
}

export default Index;
