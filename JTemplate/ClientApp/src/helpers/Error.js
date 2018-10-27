


export const getErrorsForId = (id, errs) => {

    let errors = [];
    if (errs) {
        errs.forEach((error) => {
        if (error.key === id) {
            errors.push(error);
        }
        });
    }
  
    return errors;
}


export function containsError(errors, str) {
    var found = false;
    if (errors) {
      errors.forEach((error) => {
        if (error.message.includes(str)) {
          found = true;
        }
      });
    }
    return found;
  }

