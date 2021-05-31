const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    } else {
        message = Object.values(err.errors).find(value => value?.message)?.message
    }
}

const getUniqueErrorMessage = (err) => {
    let output;
    const { message } = err;
    try {
        const fieldName = message?.substring(message?.lastIndexOf('.$') + 2, message?.lastIndexOf('_1'));
        output = `${fieldName?.charAt(0).toUpperCase() + fieldName?.slice(1)} already exists`;
    } catch(ex) {
        output = 'Unique field already exists';
    }
    return output;
}

export default getErrorMessage;