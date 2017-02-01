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

                <div className="row page-header">
                    <div className="col-xs-11">
                        <h3>Credentials</h3>
                    </div>
                    <div className="col-xs-1">
                        <Link to="/credentials/create" className="btn btn-primary">New</Link>
                    </div>
                </div>


                <div className="row">
                    <div className="col">
                        <ul className="list-group">
                            {
                                this.props.credentials.map( (cred) => {
                                    return <li key={cred.id}className="list-group-item"><Link to={`/credentials/create/${cred.id}`} >{cred.name}</Link></li>
                                })
                            }
                        </ul>
                    </div>
                </div>

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