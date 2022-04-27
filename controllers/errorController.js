const errors = (errorType, path, method) => {

    let error = {}

    switch (errorType) {

        case 'auth':
            error = {
                error: -1,
                Route: path,
                method: method,
                description: 'No autorizado'
            }
            return error

        case 'path':
            error = {
                error: -2,
                Route: path,
                method: method,
                description: 'Path does not exist'
            }
            return error

        default:
            error = {
                error: 0,
                Route: path,
                method: method,
                description: 'Error desconocido'
            }
            return error
    }
}
module.exports = errors
