const errorHandling = (res, error) => {
    return (
        res.status(500).json({
        Error: error.message 
    })
    )
}

const successHandling = (res, obj) => {
    return(
        res.status(200).json({
            results: obj
        })
    )
}

const incompleteHandling = res => {
    return(
        res.status(404).send(
            `Record unable to be added`
        )
    )
}

module.exports = {
    errorHandling,
    successHandling,
    incompleteHandling
}