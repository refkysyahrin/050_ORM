const express = require("express");
const app = express();
const port = 3000;
const db = require("./models");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log("Server started on port 3000");
});

db.sequelize.sync().then((result) => {
  app
    .listen(3000, () => {
      console.log("Server started");
    })
    .catch((err) => {
      console.log(err);
    });
});
