const apiRoutes = require('./login')

const ConstructorMethod = (app) => {
    app.use('/', apiRoutes);

    app.use('*', (req, res) => {
        return res.status(404).json("Not Found");
    })
}

module.exports = ConstructorMethod;