var ambiente_processo = 'desenvolvimento';
// var ambiente_processo = 'producao';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");

var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
var apiKey = process.env.MINHA_CHAVE;
module.exports = {
    apiKey
}
var app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, "public")));

// ROTAS
var sensorRouter = require("./src/routes/sensorRoutes");
var medidaSensorRouter = require("./src/routes/medidaRoutes");
var dashboardRouter = require("./src/routes/dashboardRoutes");
var postoRouter = require("./src/routes/postoRoute");
var funcionarioRouter = require("./src/routes/funcionarioRoute");
var bobIARouter = require("./src/routes/bobIARoute")
// PREFIXOS CORRETOS
app.use("/sensores", sensorRouter);     // GET /sensores
app.use("/medidas", medidaSensorRouter); // GET /medidas/ultimas/101
app.use("/dashboard", dashboardRouter);  // GET /dashboard
app.use("/posto", postoRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/bobia", bobIARouter)

// ROTA PRINCIPAL → SERVE O INDEX
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// INICIAR SERVIDOR
app.listen(PORTA_APP, function () {
  console.log(`
    Servidor rodando!
    Acesse: http://${HOST_APP}:${PORTA_APP}
  `);
});

module.exports = app;
