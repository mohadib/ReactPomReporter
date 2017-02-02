/**
 * Created by jdavis on 1/31/17.
 */
import React, {Component} from 'react';

class Alert extends Component {

    getClass()
    {
        if( this.props.type === "error")
        {
            return "alert alert-danger alert-dismissible"
        }
        return "alert alert-info alert-dismissible"
    }

    render()
    {
        return (
            <div className={this.getClass()} role="alert">
                {this.props.msg}
            </div>
        )
    }
}

export default Alert