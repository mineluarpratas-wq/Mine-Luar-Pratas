import { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  // BUSCAR DO SERVIDOR
  useEffect(() => {
    fetch("https://loving-wisdom-production-157b.up.railway.app/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  function adicionarAoCarrinho(produto) {
    setCarrinho([...carrinho, produto]);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Minha Loja</h1>

      <h2>Produtos</h2>
      {produtos.map(p => (
        <div key={p._id}>
          <h3>{p.nome}</h3>
          <p>R$ {p.preco}</p>
          <button onClick={() => adicionarAoCarrinho(p)}>
            Comprar
          </button>
        </div>
      ))}

      <h2>Carrinho</h2>

      <h2>Adicionar Produto</h2>

      <input id="nome" placeholder="Nome do produto" />
      <input id="preco" placeholder="Preço" />

      <button onClick={async () => {
        const nome = document.getElementById("nome").value;
        const preco = document.getElementById("preco").value;

        await fetch("https://loving-wisdom-production-157b.up.railway.app/produtos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            nome,
            preco
          })
        });

        alert("Produto adicionado!");
        window.location.reload();
      }}>
        Adicionar Produto
      </button>

      {carrinho.map((item, i) => (
        <p key={i}>{item.nome}</p>
      ))}
    </div>
  );
}

export default App;