import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import { getErrorsForId } from "../../helpers/Error";

export const renderErrors = (id, props) => {

  if (props.errors) { 
    let errors = getErrorsForId(id, props.errors);
    return (
        <ul style={listStyle}>
          <Wrapper id={id}>
            {errors.map(error => (
              <li style={errorStyle} className="station" key={error.message}>{error.message}</li>
            ))}
          </Wrapper>
        </ul>
    );
  }

  return null;
}

export const Wrapper = props => {

  if (props.id === '*') {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    );
  } else {
    return (
      <FormHelperText id="component-error-text">
        {props.children}
      </FormHelperText>
    );
  }
}


const listStyle = {
  listStyleType: 'none',
  padding: 0,
};

const errorStyle = {
  color: 'red'
}