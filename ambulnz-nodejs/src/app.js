const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pizzasRouter = require("./routes/pizzas");
const orderRouter = require("./routes/pedidos");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", pizzasRouter, orderRouter);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`);
});
