




export const validateFields = (inputFields) => {

    let errors = [];
    if (inputFields) {
        inputFields.forEach(inputField => {
            if (!inputField.value && inputField.required) {
                errors.push({ key: inputField.id, message: 'Required Field' });
            }
        });
    }

    return errors;
}