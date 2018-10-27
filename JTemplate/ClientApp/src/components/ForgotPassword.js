import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/CheckCircle';
import { Button } from 'reactstrap';
import ErrorIcon from '@material-ui/icons/Error';
import { renderErrors, getErrors } from "./sub/Errors";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/passwordActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import renderInputField from "./sub/JInputField";
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';


class ForgotPassword extends Component {


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

    sendLink = e => {

        e.preventDefault();

        this.props.emailPasswordReset(this.state.inputFields);

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

                    onClick={this.sendLink}
                >
                    Send Reset Link
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
                            We've sent a password reset link to {this.state.inputFields[0].value}
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
                        Reset Password
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" paragraph>
                        Enter your email below, and we will send a link to reset your password
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


export default connect(
    state => state.password,
    dispatch => bindActionCreators(actionCreators, dispatch)
  )(withStyles(styles)(ForgotPassword));
  