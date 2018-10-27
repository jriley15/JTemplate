import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import "../resources/css/Main.css";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import indigo from '@material-ui/core/colors/indigo';
import Footer from './sub/Footer';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: indigo,
    secondary: purple,
  }
});

export default props => (
  <React.Fragment>
      <CssBaseline />

      <MuiThemeProvider theme={theme}>

        <NavMenu />

        <Container className="mainContainer">
          {props.children}
        </Container>

        <Footer />

      </MuiThemeProvider>

  </React.Fragment>
);

