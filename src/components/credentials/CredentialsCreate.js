/**
 * Created by mohadib on 1/29/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Credential from '../../models/Credential'
import {CredentialActions} from '../../actions/ActionTypes'
import {saveActionCreator, updateActionCreator} from '../../services/CredentialsService'
import Alert from '../Alert'

class CredentialsCreate extends Component {

    componentWillMount() {
        this.props.createNew();
    }

    handleChange(e) {
        let cred = new Credential().copy(this.props.credential);
        cred[e.target.id] = e.target.value;
        this.props.propertyUpdated(cred);
    }


    handleSave() {
        let cred = this.props.credential;
        if (cred.isValid()) {
            if( cred.id )
            {
                this.props.update(cred)
            }
            else
            {
                this.props.save(cred)
            }
        }
    }

    render() {
        if (!this.props.credential) {
            return (<div/>)
        }

        let errorDiv = null;
        if( this.props.err )
        {
            errorDiv = <Alert type="error" msg={this.props.err.response.data.msg} />
            setTimeout( this.props.resetAlerts, 10000)
        }
        else if( this.props.saved )
        {
            errorDiv = <Alert type="info" msg="Credentials saved" />
            setTimeout( this.props.resetAlerts, 10000)
        }


        return (


            <div onChange={this.handleChange.bind(this) }>

                { errorDiv }

                <div className="form-group">
                    <label>Name</label>
                    <input className="form-control" type="text" value={this.props.credential.name} id="name"/>
                </div>
                <div className="form-group">
                    <label>Protocol</label>
                    <select className="form-control" value={this.props.credential.protocol} id="protocol">
                        <option>http</option>
                        <option>https</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Host</label>
                    <input className="form-control" type="text" value={this.props.credential.host} id="host"/>
                </div>
                <div className="form-group">
                    <label>Port</label>
                    <input className="form-control" type="text" value={this.props.credential.port} id="port"/>
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" value={this.props.credential.username} id="username"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" value={this.props.credential.password} id="password"/>
                </div>

                <button className="btn btn-primary" onClick={this.handleSave.bind(this) }>Save</button>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        credential: state.active.credential,
        err: state.active.err,
        saved: state.active.saved
    };
}

function mapDispatchToProps(dispatch, state) {
    return {
        save: saveActionCreator(dispatch, state),
        update: updateActionCreator(dispatch, state),
        createNew: () => {
            dispatch({type: CredentialActions.CREATE_NEW, payload: new Credential()})
        },
        propertyUpdated: (credential) => {
            dispatch({type: CredentialActions.PROPERTY_UPDATED, payload: credential})
        },
        resetAlerts: () => {  dispatch({type: CredentialActions.RESET_ALERTS, payload:null})  }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CredentialsCreate);