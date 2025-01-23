let secureApi = (req, res, next) => {

    if (req.headers.authorization == "uApd1IFZkvSTBSO") {
        next()
    }
    else{
        res.send("Authorization failed ")
    }
    // console.log("it is middleware");
    // next();
};

module.exports = secureApi;
