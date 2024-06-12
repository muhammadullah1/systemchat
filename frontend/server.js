const express = require("express");
const path = require("path");
const dotenv = require("dotenv"); // Importe o módulo dotenv
dotenv.config(); // Carregue as variáveis de ambiente do arquivo .env
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Frontend server is running on port ${port}`);
});
