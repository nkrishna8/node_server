const express = require('express');
const { errorCreator } = require('../utils/responseCreator');
const router = express.Router();

//http://localhost:4000/router
router.get('/', (req, res) => {
    console.log(req.path);
    // res.send({ data: req.path });
    res.send({ data: "Redirected to this path Successful"+req.path });
});

//http://localhost:4000/router/user/101
router.get('/user/:id', (req, res) => {
    console.log("KKKLLLL+++", req.params);       // {id}:101
    res.send({ data: req.params });
});

router.delete('/user/:id', (req, res) => {
    console.log(req.params);       // {id}:101
    res.send({ data: req.params });
});

// http://localhost:4000/router/search?name=abcd
router.get('/search', (req, res) => {
    console.log(req.query);
    res.send({ data: req.query });
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.status(201);
    res.send(responseCreator("Request Completed"));
    // res.send({ success: true, message: "Request Completed" });
});

//WildCard Router or non existing page/404 error 
router.all('/*', (req, res, next) => {
    // console.log("Wildcard Router Hit",req.method,req.path);
    // res.status(404);
    // res.send({ success: false, message: "Invalid Request" })

    try {
        // const err = new Error("Invalid Request");
        // err.status = 501;
        // throw err
        errorCreator("Invalid Request",501);
    } catch (error) {
        next(error)
    }
})

module.exports = router;