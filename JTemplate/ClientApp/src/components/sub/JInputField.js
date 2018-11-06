import React from 'react';
import { renderErrors } from "./Errors";
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { getErrorsForId } from "../../helpers/Error";


export const setInputField = (id, value, component) => {
  let inputFieldState = [...component.state.inputFields];
  const index = inputFieldState.findIndex(inputField => inputField.id === id);
  inputFieldState[index].value = value;
  component.setState({ inputFields: inputFieldState });
}

const handleInputChange = component => e => {
  /*this.setState({
    [e.target.id]: { ...this.state[e.target.id], value: e.target.value }
  });
  */
  setInputField(e.target.id, e.target.value, component);
};

export default (inputField, component) => {

    let errors = getErrorsForId(inputField.id, component.props.errors);
    let error = false;

    if (!(errors === undefined || errors.length == 0)) {
      error = true;
    }
    if (inputField.type != 'hidden') {
      return (
        <FormControl required={inputField.required} fullWidth error={error} key={inputField.id}>
          <InputLabel htmlFor={inputField.id}>{inputField.name}</InputLabel>
          <Input
            name={inputField.name}
            type={inputField.type}
            id={inputField.id}
            autoComplete={inputField.id.autoComplete}
            onChange={handleInputChange(component)}


          />

          {renderErrors(inputField.id, component.props)}

        </FormControl>
      );
    } else {
      return null;
    }


  };

