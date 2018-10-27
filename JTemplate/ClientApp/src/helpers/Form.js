



export const setupRequest = (inputFields) => {

    let request = {};
    inputFields.forEach(inputField => {
        request = { ...request, [inputField.id]: inputField.value }
    });

    return request;

}