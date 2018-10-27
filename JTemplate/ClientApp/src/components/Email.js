

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
import { actionCreators } from '../actions/emailActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import renderInputField from "./sub/JInputField";
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

class Confirm extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        const values = queryString.parse(this.props.location.search);

        this.props.confirm(values.token);
    }

    render() {
        const { classes } = this.props;

        if (this.props.loading) {

            return (
                <React.Fragment>
                    <main className={classes.layoutConfirm}>
                        <CircularProgress className={classes.progress} size={50} />
                    </main>
                </React.Fragment>
            );

        } else {

            if (this.props.success) {
                return (
                    <React.Fragment>
                        <main className={classes.layoutConfirm}>

                            <CheckIcon className={classes.check} fontSize="large" />
                            <Typography component="h1" variant="h4">
                                Success
                            </Typography>
                            <br />
                            <Typography variant="body2" align="center" color="textSecondary" paragraph>
                                Your email address has been confirmed, click the button below to login
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
                        </main>

                    </React.Fragment >
                );
            } else {
                return (
                    <React.Fragment>
                        <main className={classes.layoutConfirm}>

                            <ErrorIcon color="error" fontSize="large" />
                            <Typography component="h1" variant="h4">
                                Error
                            </Typography>
                            <br />

                            {renderErrors('*', this.props)}

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.back}
                                onClick={() => this.props.history.push('/emailResend')}
                            >
                                Resend Link
                            </Button>
                        </main>

                    </React.Fragment >
                );
            }
        }
    }
}

class Resend extends Component {

    constructor(props) {
        super(props);

        this.state = {

            inputFields: [
                {
                    id: 'Email',
                    name: 'Email Address',
                    type: 'Email',
                    autoComplete: "current-email",
                    required: true
                }
            ]
        };
    }

    componentWillMount() {

        this.props.reset();

    }

    resendLink = e => {

        e.preventDefault();

        this.props.resend(this.state.inputFields);

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

                    onClick={this.resendLink}
                >
                    Resend Link
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
                            We've sent another confirmation email to {this.state.inputFields[0].value}
                        </Typography>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.back}
                            onClick={() => this.props.history.push('/')}
                        >
                            Home
                        </Button>
                </React.Fragment >
            );
        } else {

            return (
                <React.Fragment>
                    <Avatar className={classes.avatarResend}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Resend Confirmation Email
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" paragraph>
                        If this email exists in our system and hasn't already been confirmed, we will send a new confirmation email.
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


export const EmailConfirm = (connect(
    state => state.email,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(Confirm)));

export const EmailResend = (connect(
    state => state.email,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(Resend)));



