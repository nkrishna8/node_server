const errorHandler = (error, req, res, next) => {

    // console.error("Error====+++++",error);
    if(error.code==11000){
        error.message='User already Exist';
        error.status=403
    }

    if(error.name==='TokenExpiredError'){
        error.message='Session Expired, Please Login To Conyinue';
        error.status=401
    }
    console.log("Error Handler is on Duty");
    res.status(error.status || 500)
    res.send({ success: false, message: error.message });
}

module.exports = errorHandler;