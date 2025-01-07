const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${HOST}:${PORT}`);
});
