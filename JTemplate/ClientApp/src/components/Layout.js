import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';
import "../resources/css/Main.css";

export default props => (
  <div>
    <NavMenu />

    <Container>
      {props.children}
    </Container>


  </div>
);
