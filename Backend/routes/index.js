const apiRoutes = require("./login");
const invRoutes = require("./inventory");

const ConstructorMethod = (app) => {
  app.use("/", apiRoutes);
  app.use("/", invRoutes);

  app.use("*", (req, res) => {
    return res.status(404).json("Not Found");
  });
};

module.exports = ConstructorMethod;
