

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Button } from 'reactstrap';
import queryString from 'query-string'
import ErrorIcon from '@material-ui/icons/Error';
import { renderErrors, getErrors } from "./sub/Errors";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/passwordActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import renderInputField, { setInputField } from "./sub/JInputField";

import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';


class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.state = {

            inputFields: [
                {
                    id: 'Password',
                    name: 'New Password',
                    type: 'password',
                    required: true
                  },
                  {
                    id: 'PasswordConfirm',
                    name: 'Confirm New Password',
                    type: 'password',
                    required: true
                  },
                  {
                    id: 'Token',
                    name: 'Token',
                    type: 'hidden',
                    required: true
                  },

            ],

            queryStringValues: {},

            valid: false


        };
    }

    componentWillMount() {

        let values = queryString.parse(this.props.location.search)

        this.props.reset();

        if (values.token) {
            this.setState({valid: true});
            setInputField("Token", values.token, this);
        }

    }

    resetPassword = e => {

        e.preventDefault();

        this.props.resetPassword(this.state.inputFields);

    };

    renderButton() {

        const { classes } = this.props;
        if (this.props.loading) {
            return (
                <FormControl fullWidth>
                    <CircularProgress className={classes.progress2} size={50} />
                </FormControl>

            );
        } else {
            return (
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"

                    onClick={this.resetPassword}
                >
                    Change Password
            </Button>
            );
        }
    }


    renderForm() {
        const { classes } = this.props;

        if (this.props.success) {
            return (
                <React.Fragment>
                        <CheckIcon className={classes.check} fontSize="large" />
                        <Typography component="h1" variant="h4">
                            Success
                        </Typography>
                        <br />
                        <Typography variant="body2" align="center" paragraph>
                            Your password has successfully be changed
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.back}
                            onClick={() => this.props.history.push('/login')}
                        >
                            Login
                        </Button>
                </React.Fragment >
            );
        } else {

            if (this.state.valid) {
                return (
                    <React.Fragment>
                        <Avatar className={classes.avatarResend}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <Typography variant="body2" align="center" color="textSecondary" paragraph>
                            Enter your new password below
                        </Typography>

                        <form className={classes.form}>

                            {this.state.inputFields.map(inputField => (
                                renderInputField(inputField, this)
                            ))}
                            {renderErrors('*', this.props)}

                            {this.renderButton()}
                        </form>
                    </React.Fragment>
                );
            } else {
                return (
                    <React.Fragment>
                        <ErrorIcon color="error" fontSize="large" />
                        <Typography component="h1" variant="h4">
                            Error
                        </Typography>
                        <br />
                        <Typography variant="body2" align="center" paragraph>
                            Invalid password reset link, try sending another or contacting support.
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.back}
                            onClick={() => this.props.history.push('/forgotPassword')}
                        >
                            Send Another
                        </Button>
                    </React.Fragment>
                );
            }
        }

    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <main className={classes.layoutResend}>
                    <Paper className={classes.paper}>
                        {this.renderForm()}
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

const styles = theme => ({
    layoutConfirm: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        alignItems: 'center',
        textAlign: 'center'
    },
    layoutResend: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        alignItems: 'center',
        textAlign: 'center'
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatarConfirm: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: green[500],
    },
    avatarResend: {
        margin: theme.spacing.unit
    },
    back: {
        marginTop: theme.spacing.unit * 3,
    },
    check: {
        color: green[500]
    },
    progress: {
        marginTop: theme.spacing.unit * 7,
    },
    progress2: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    }
});


export default (connect(
    state => state.password,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(ResetPassword)));

