import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/authActions';

export function requireAnonymous(ChildComponent) {
    class Anonymous extends Component {

        componentWillMount() {
            if (this.props.authenticated) {
                this.props.logout();
            }
        }

        render() {
            return (
                <ChildComponent {...this.props} />
            );
        }
    }

    return connect(
        state => state.auth,
        dispatch => bindActionCreators(actionCreators, dispatch)
    )(Anonymous);
}


export function requireAuth(ChildComponent) {
    class Authorize extends Component {

        render() {

            if (!this.props.authenticated) {
                return (
                    <div className="container">
                        <h1 className="h3 mb-3 font-weight-normal">You must be logged in to view this page</h1>
                    </div>
                );
            }

            return (
                <ChildComponent {...this.props} />
            );
        }
    }

    return connect(
        state => state.auth,
        dispatch => bindActionCreators(actionCreators, dispatch)
    )(Authorize);
}
