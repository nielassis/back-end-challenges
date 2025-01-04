const express = require("express");
const app = express();

const restauranteRoutes = require("./routes/restaurante");
const produtosRoutes = require("./routes/produtos-restaurante");

app.use(express.json());

app.use("/restaurantes", restauranteRoutes);

app.use("/produtos", produtosRoutes);

app.listen(3000, () => {
  console.log(`Server Running on port 3000`);
});
