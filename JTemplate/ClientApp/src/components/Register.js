import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions/registerActions';
import "../resources/css/Register.css";
import { renderErrors, getErrors } from "./sub/Errors";
import renderInputField from "./sub/JInputField";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DoneIcon from '@material-ui/icons/DoneOutlined';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import OAuth from './OAuth';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {

      inputFields: [
        {
          id: 'FirstName',
          name: 'First Name',
          required: false
        },
        {
          id: 'LastName',
          name: 'Last Name',
          required: false
        },
        {
          id: 'Email',
          name: 'Email Address',
          required: true
        },
        {
          id: 'Password',
          name: 'Password',
          type: 'password',
          required: true
        },
        {
          id: 'PasswordConfirm',
          name: 'Confirm Password',
          type: 'password',
          required: true
        }
      ]
    };

    this.submitRegister = this.submitRegister.bind(this);
  }

  componentWillUnmount() {
    this.props.unmount();
  }

  submitRegister = e => {
    e.preventDefault();
    this.props.register(this.state.inputFields);
  };


  render() {

    const { classes } = this.props;
    if (this.props.success) {
      return (
        <React.Fragment>
          <main className={classes.successLayout}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar_2}>
                <DoneIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Success
              </Typography>
              <Typography variant="body2" align="center" color="textSecondary" paragraph>
                A confirmation email has been sent to {this.state.inputFields[2].value}. Click on the confirmation link in the email to activate your account.
              </Typography>
            </Paper>
          </main>


        </React.Fragment>
      );

    } else {
      return (
        <React.Fragment>
          <main className={classes.formLayout}>
            <Paper className={classes.paper}>

              <Avatar className={classes.avatar}>
                <AccountIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              {renderErrors('*', this.props.errors)}
              <form className={classes.form}>

                {this.state.inputFields.map(inputField => (
                  renderInputField(inputField, this)
                ))}

                {this.renderSubmitButton()}
              </form>
              <Typography variant="body2" paragraph>
                  Already have an account? Sign in <Link to="/login">here</Link> 
              </Typography>
              <Divider className={classes.divider}/>
            
              <OAuth/>

            </Paper>

          </main>
        </React.Fragment>

      );
    }
  }



  renderSubmitButton() {
    const { classes } = this.props;


    if (this.props.loading) {
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
          onClick={this.submitRegister}
        >
          Submit
          </Button>
      );
    }
  }
}

const styles = theme => ({
  formLayout: {
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
  successLayout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      width: 700,
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
  avatar_2: {
    margin: theme.spacing.unit,
    backgroundColor: green[500],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit
  },
  progress: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  divider: {
    marginTop: theme.spacing.unit,
    width: '80%', 
    marginBottom: theme.spacing.unit * 3,

  }
});

export default connect(
  state => state.register,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(withStyles(styles)(Register));
