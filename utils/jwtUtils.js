const { sign, verify } = require('jsonwebtoken');
const { errorCreator } = require('./responseCreator');

const SECRET_KEY = "hello@json";

const generateToken = (data,timeduration='1h') => {
    return sign(data, SECRET_KEY, { expiresIn: timeduration });
}

const verifyToken = (token) => {
    if(!token){
        errorCreator("Token Missing!!, Please Login to Continue", 401);
    }

    const dataOutput= verify(token, SECRET_KEY);
    console.log(dataOutput);
    return dataOutput;
}


module.exports = { generateToken, verifyToken };

// let dataForToken={
//     "username": "kri08_Pfd",
//     "password": "admin@123"
//   };
// // const tokenGenerated = generateToken(dataForToken);

// // console.log(tokenGenerated);

// console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtyaTA4X1BmZCIsInBhc3N3b3JkIjoiYWRtaW5AMTIzIiwiaWF0IjoxNzE0NDc0NjYwLCJleHAiOjE3MTQ0NzQ3NjV9.utTVqDnwAEc9FR4DELlLERe39E-TqJfVmOmj9jp5Nn4"));