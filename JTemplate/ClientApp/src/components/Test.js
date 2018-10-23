

import React from 'react';
import { connect } from 'react-redux';

class Test extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
      return (
        <div>
          Authorized view
          
        </div>  
        );
  }



}


export default connect(state => state.counter)(Test);



