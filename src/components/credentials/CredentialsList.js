/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getAll } from '../../services/CredentialsService'
import { Link } from 'react-router'

class CredentialsList extends Component {

    componentWillMount()
    {
        this.props.getList();
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h3>Credentials</h3>
                </div>

                <ul className="list-group">
                    {
                        this.props.credentials.map( (cred) => {
                            return <li key={cred.id}className="list-group-item"><Link to={`/credentials/create/${cred.id}`} >{cred.name}</Link></li>
                        })
                    }
                </ul>
            </div>
        );
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

export default connect( mapStateToProps, mapDispatchToProps )( CredentialsList )