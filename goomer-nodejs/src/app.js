const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { z } = require("zod");

require("dotenv").config();

const app = express();

const CorsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3001",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const restauranteRoutes = require("./routes/restaurante");
const produtosRoutes = require("./routes/produtos-restaurante");

app.use(cors(CorsOptions));
app.use(express.json());

//docs swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Goomer API",
      version: "1.0.0",
      description:
        "Documentação da API do Goomer | Desafio Back-end com express",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],
    components: {
      schemas: {
        Produtos: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            nome: {
              type: "string",
            },
            preco: {
              type: "number",
            },
            restauranteId: {
              type: "string",
              format: "uuid",
            },
            promocao: {
              type: "object",
              properties: {
                tipo: {
                  type: "string",
                },
                valor: {
                  type: "number",
                },
                dataInicio: {
                  type: "string",
                  format: "date",
                },
                dataFim: {
                  type: "string",
                  format: "date",
                },
              },
            },
          },
        },
        Restaurantes: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
            },
            foto: {
              type: "string",
            },
            nome: {
              type: "string",
            },
            horarioSemana: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  inicio: {
                    type: "string",
                  },
                  fim: {
                    type: "string",
                  },
                },
                required: ["inicio", "fim"],
              },
            },
            horarioFimSemana: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  inicio: {
                    type: "string",
                    format: "time", // ou outro formato que defina a hora
                  },
                  fim: {
                    type: "string",
                    format: "time", // ou outro formato que defina a hora
                  },
                },
                required: ["inicio", "fim"],
              },
            },
            endereco: {
              type: "string",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/restaurantes", restauranteRoutes);
app.use("/produtos", produtosRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Rodando em http://localhost:${PORT}`);
  console.log("Documentação disponível em http://localhost:3000/api-docs");
});

module.exports = { app };
