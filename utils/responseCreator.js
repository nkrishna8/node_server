
const responseCreator = (message_get, data) => {
    // console.log("Response Function Message=>>", message_get);
    console.log("Response Function Data=>>", data);

    let response = {
        success: true,
        message: message_get ? message_get : null,
        data:data
    };

    // let response = res.send({ success: true, message });
    // console.log("response++++++", response);

    // if (data) {
    //     response.data = data;
    // };
    return response
};

const errorCreator = (message, status = 500) => {
    console.log("Custom errorCreator+++++");
    const err = new Error(message);
    err.status = status; 
    throw err
}

module.exports = { responseCreator, errorCreator }