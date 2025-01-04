const express = require("express");
const router = express.Router();
const restaurantes = require("../../controllers/restaurantes.controller");

router.get("/", restaurantes.findAll);

router.get("/data", restaurantes.findAllData);

router.post("/", restaurantes.createNew);

router.put("/:id", restaurantes.update);

router.delete("/:id", restaurantes.destroy);

module.exports = router;
