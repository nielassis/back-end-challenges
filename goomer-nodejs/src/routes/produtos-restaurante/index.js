const express = require("express");
const router = express.Router();
const produtos = require("../../controllers/produtos.controller");

router.post("/", produtos.createNew);

router.get("/", produtos.findAll);

router.get("/:restauranteId", produtos.findById);

router.put("/:id", produtos.update);

router.delete("/:id", produtos.destroy);

module.exports = router;
