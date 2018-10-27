import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/authActions';
import "../resources/css/Login.css";
import { renderErrors, getErrors } from "./sub/Errors";
import renderInputField from "./sub/JInputField";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import pink from '@material-ui/core/colors/pink';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { containsError } from "../helpers/Error";


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {

      inputFields: [
        {
          id: 'Email',
          name: 'Email Address',
          autoComplete: "email",
          required: true
        },
        {
          id: 'Password',
          name: 'Password',
          type: 'password',
          autoComplete: "current-password",
          required: true
        }
      ]
    };

    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillUnmount() {

    this.props.unmount();

  }

  submitLogin = e => {

    if (!this.props.loggingIn)
      this.props.login(this.state.inputFields);

    e.preventDefault();

  };


  renderLoginButton() {
    const { classes } = this.props;
    if (this.props.loggingIn) {
      return (    
        <FormControl fullWidth>
          <CircularProgress className={classes.progress} size={50} />
        </FormControl>

      );
    } else {
      return (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.submitLogin}
          >
            Sign in
          </Button>
      );
    }
  }

  renderCustomErrors() {

    if (containsError(this.props.errors, "has not been confirmed")) {
      return (
        <Typography variant="body1" paragraph>
          <Link to="/emailResend">Click here</Link> to send another confirmation email
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {renderErrors('*', this.props)}
            {this.renderCustomErrors()}

            <form className={classes.form}>
              
              {this.state.inputFields.map(inputField => (
                renderInputField(inputField, this)
              ))}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Typography variant="body2" color="primary" paragraph>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </Typography>
              


              {this.renderLoginButton()}
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paddingTop: theme.spacing.unit * 8,
  },
  paper: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: pink[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});



export default connect(
  state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(Login));
