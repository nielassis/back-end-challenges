const db = require("./models/index.js");

async function testConnection() {
  try {
    console.log("Tentando se conectar ao banco de dados...");
    await db.sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } finally {
    await db.sequelize.close();
  }
}

testConnection();
