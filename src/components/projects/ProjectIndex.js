/**
 * Created by jdavis on 2/1/17.
 */
import React, {Component} from 'react';

class ProjectIndex extends Component {
    render()
    {
        return (
            <div className="container">
                { this.props.children }
            </div>
        );
    }
}

export default ProjectIndex;
