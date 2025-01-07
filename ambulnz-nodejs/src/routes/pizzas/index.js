const express = require("express");
const router = express.Router();
const pizzas = require("../../controllers/pizzas.controller");

router.get("/pizzas", pizzas.find);

router.get("/pizzas/:id", pizzas.findById);

module.exports = router;
