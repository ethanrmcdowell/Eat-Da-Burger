let express = require("express");
let router = express.Router();
let burger = require("../models/burger.js");

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        let hbsObject = {
            burgers: data
        }
        res.render("index", hbsObject);
    });
});

router.post("/burgers", (req, res) => {
    burger.insertOne([
        "burger_name"
    ], [
        req.body.burger_name
    ], () => {
        res.redirect("/");
    });
});

router.put("/burger/:id", (req, res) => {
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, () => {
        res.redirect("/");
    });
});



module.exports = router;