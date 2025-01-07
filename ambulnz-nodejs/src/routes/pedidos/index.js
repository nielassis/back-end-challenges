const express = require("express");
const router = express.Router();
const order = require("../../controllers/order.controller");

router.get("/order", order.find);

router.get("/order/:id", order.findById);

router.post("/order", order.createNewOrder);

module.exports = router;
