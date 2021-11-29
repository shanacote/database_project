// https://www.bezkoder.com/node-js-rest-api-express-mysql/
// https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/
// Make sure mysql is running: 'brew services start mysql'
// Start the app:  node server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/tutorial.routes")(app);
require("./routes/major.routes")(app);
require("./routes/student.routes")(app);
require("./routes/course.routes")(app);
require("./routes/sport.routes")(app);
require("./routes/club.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
