/**
 * Created by jdavis on 2/1/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

class GenericListComponent extends Component
{
    render() {
        let that = this;

        return (
            <ul className="list-group">
                {
                    this.props.items.map( (cred) => {
                        return <li key={cred[that.props.mykey]}className="list-group-item"><Link to={`${that.props.linkto}${cred[that.props.mykey]}`} >{cred.name}</Link></li>
                    })
                }
            </ul>
        );
    }
}

function mapStateToProps( state )
{
    return {};
}

function mapDispatchToProps( dispatch, state )
{
    return {};
}

export default connect( mapStateToProps, mapDispatchToProps)( GenericListComponent )