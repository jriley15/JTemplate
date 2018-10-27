import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import ErrorIcon from '@material-ui/icons/Error';
import { Button } from 'reactstrap';

function NotFound(props) {

    const { classes } = props;
    return (
        <React.Fragment>
            <main className={classes.layout}>

                <ErrorIcon color="error" fontSize="large" />
                <Typography component="h1" variant="h4">
                    Oops
                </Typography>
                <br/>
                <Typography variant="body2" align="center" color="textSecondary" paragraph>
                    We couldn't find that page
                </Typography>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.back}
                    onClick={() => props.history.goBack()}
                >
                    Go Back
                </Button>
            </main>

        </React.Fragment >
    );

}


const styles = theme => ({
    layout: {
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

    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: red[500],
    },
    back: {
        marginTop: theme.spacing.unit * 3,
      },
});


export default withStyles(styles)(NotFound);
