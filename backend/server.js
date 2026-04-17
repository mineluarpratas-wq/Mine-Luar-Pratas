const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// CONECTAR AO BANCO
mongoose.connect("mongodb://127.0.0.1:27017/loja");

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
  console.log("Servidor rodando");
});
  console.log("Servidor rodando em http://localhost:3000");
});