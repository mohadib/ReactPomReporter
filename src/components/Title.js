import React, {Component} from 'react';

class Title extends Component
{
   getButtons()
   {
      if( !this.props.buttons ) return null;

      return this.props.buttons.map( (btn)=> {
         return (
             <span key={btn.name} onClick={btn.action} className="pull-right btn btn-danger" style={{marginTop:'20px', marginBottom:'10px'}}>
                {btn.name}
             </span>
         );
      });
   }

   render()
   {
      this.getButtons.bind(this);
      return (
          <div className="page-header" style={{marginTop:'0px' }}>
            <h3 style={{display: 'inline-block', paddingLeft:'10px'}}>{ this.props.title }</h3>
             { this.getButtons() }
          </div>
      );
   }
}

export default Title