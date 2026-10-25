
import CardFilme from "./components/CardFilme";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [filmes, setFilmes] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [dadosdousuario, setDadosdousuario] = useState({});

  function fazerLogout() {
  if (!token) {
    setMensagem("Você não está logado.");
    return;
  }

  setToken("");
  setDadosdousuario({});
  localStorage.removeItem("token");
  setMensagem("Você saiu da sua conta.");
}

  function fazerLogin() {
  fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: senha
    })
  })
    .then((resposta) => {
      if(resposta.ok){
        return resposta.json()
      }else{
        setMensagem("E-mail ou senha incorretos");
        return;
      }
    })
    
    .then((dados) => {
     if (dados) {
    setToken(dados.data.token);
    localStorage.setItem("token", dados.data.token);
    setMensagem(dados.message);
  }
})
.catch((erro)=>{
  console.log("Erro detectado", erro)
  setMensagem("Nao foi possivel conectar ao servidor")
}
);
}
function buscarUsuario() {
  if (!token) {
    setMensagem("Faça login antes de consultar seu usuário.");
    return;
  }

  fetch("http://localhost:3000/api/users/me", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        setMensagem("Erro ao consultar usuário.");
        return;
      }
    })
    .then((dados) => {
      if (dados) {
        console.log("Dados do usuário:", dados.data);
        setDadosdousuario(dados.data);
        setMensagem("Usuário consultado com sucesso!");
      }
    })
    .catch((erro) => {
      console.log("Erro detectado:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
    });
}


  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setFilmes(dados.data);
      })
      .catch((erro) => {
        console.log("Erro ao buscar filmes:", erro);
      });
  }, 
  []);
 return (
    <div>
      <h1>Meu Catálogo de Filmes</h1>
        <div className="arealogin">
        <h2>Login</h2>
    
  <input placeholder="Digite seu e-mail" value={email} onChange={(evento)=>setEmail(evento.target.value)}/>

  <br />

  <input type="password" placeholder="Digite sua senha" value={senha} onChange={(evento)=>setSenha(evento.target.value)} />

  <br />

  <button onClick={fazerLogin}>Entrar</button>
  <button onClick={buscarUsuario}>Conferir meu Usuário</button>
  <button onClick={fazerLogout}>Sair</button>
  </div>
      <p className="msg">{mensagem}</p>
      <p>{dadosdousuario.name}</p>
      <p>{dadosdousuario.email}</p>
      <p>{dadosdousuario.id}</p>
      {filmes.map((filme) => (
        <CardFilme
          key={filme.id}
          title={filme.title}
          description={filme.description}
          genre={filme.genre}
          director={filme.director}
          releaseYear={filme.releaseYear}
          rating={filme.rating}
          posterUrl={filme.posterUrl}
        />
      ))}
    </div>
  );
}

export default App;
