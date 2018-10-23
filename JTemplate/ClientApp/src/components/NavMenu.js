import React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import '../resources/css/NavMenu.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../actions/authActions';

class NavMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.loginButton = this.loginButton.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  handleLogout = e => {

    e.preventDefault();
    this.props.logout();

  };


  loginButton() {
    if (!this.props.authenticated) {
      return (<Link className="nav-link text-dark mr-sm-2" to="/login">Login</Link>)
    } else {
      return (<a href="" className="nav-link text-dark mr-sm-2" onClick={this.handleLogout}>Logout</a>)
    }
  }

  signUpButton() {
    if (!this.props.authenticated) {
      return (<Link to="/register" className="btn btn-outline-primary">Sign Up</Link>)
    }
  }


  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light >
          <Container>
            <NavbarBrand href="/">JTemplate</NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
              <ul className="navbar-nav flex-grow">
              
                <NavItem>
                  <Link className="nav-link text-dark" to="/">Home</Link>
                </NavItem>
                <NavItem>
                  {this.loginButton()}
                </NavItem>
                <NavItem>
                  {this.signUpButton()}
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );

  }
}
//(state=>({user: state.user, other: state.other}))
export default connect(state => state.auth,
  dispatch => bindActionCreators(actionCreators, dispatch)
  )(NavMenu);