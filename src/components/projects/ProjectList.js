/**
 * Created by jdavis on 2/1/17.
 */
/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getAll } from '../../services/CredentialsService'
import GenericListComponent from '../GenericListComponent'

class ProjectList extends Component {

    componentWillMount()
    {
    }

    render()
    {
        return (
            <GenericListComponent  items={this.props.credentials} />
        )
    }
}


function mapStateToProps(state) {
    return {
        credentials: state.credentials.credentials,
    };
}

function mapDispatchToProps(dispatch, state) {
    return {
        getList: getAll( dispatch, state )
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( ProjectList )