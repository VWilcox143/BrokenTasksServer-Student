const setDate = (req,res,next) => {
    const date = new Date();
    req.date = date.toLocaleDateString();
    console.log(req.date);
    next()
};

module.exports = {
    setDate,
};