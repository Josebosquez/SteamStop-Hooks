function getUniqueErrorMessage(err) {
    // let message = err.message.match(/"(.*?)"/g);
    // return `${message[0].replace(/["]+/g, "")} already exists`; // says i want everything w/i thew quotes. 
    let message = err.keyValue;
    let messageKey = Object.keys(message);
    let messageValue = Object.values(message)

    return `${messageKey[0]} ${messageValue[0]} already exists!`

}

function getErrorMessage(err) {
    let message = "";
    console.log(err.message);
    if (err.code) { // if error code
        switch (err.code) { 
            case 11000: // and it makes any of the cases
            case 11001:
                message = getUniqueErrorMessage(err); // set our message to the unique err msg function.
                break;
            default: message = 'something went wrong'
        }
    } else if (err.message) { // if no code, but a message,
        return err.message //return message.
    } else {
        for (let errName in err.errors) { // if its an object error
            if (err.error[errName].message) {
                message = err.errors[errName].message
            }
        }
    }
    return message
}

module.exports = getErrorMessage;