const express = require("express");
const exphbs = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const app = express();
const methodOverride = require('method-override');

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(methodOverride('_method'));

let routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:" + PORT);
});