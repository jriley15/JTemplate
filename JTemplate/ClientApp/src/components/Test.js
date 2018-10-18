

import React from 'react';
import { connect } from 'react-redux';

class Test extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
      return (<div>{this.props.count}</div>);
  }



}


export default connect(state => state.counter)(Test);



