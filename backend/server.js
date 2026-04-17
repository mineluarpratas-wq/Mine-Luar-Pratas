const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// CONECTAR AO BANCO
mongoose.connect("mongodb+srv://mineluarpratas925:obCTvjKGBJTifEcN@cluster0.83yf995.mongodb.net/loja?retryWrites=true&w=majority");

// MODELO DO PRODUTO
const Produto = mongoose.model("Produto", {
  nome: String,
  preco: Number
});

// LISTAR PRODUTOS
app.get('/produtos', async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
});

// ADICIONAR PRODUTO
app.post('/produtos', async (req, res) => {
  const novo = new Produto(req.body);
  await novo.save();
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
