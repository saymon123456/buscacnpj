//bloco de importações
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

function App(){
  //"useState" cria uma variável que controlará o que há no componente
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){

    //exibe uma mensagem de erro caso o input esteja vazio
    if(input === ''){
      alert("Insira algum CEP!")
      return;
    }

    //o "try" relaciona um dado a uma constante de acordo com os parâmetros desejados, enquanto o "catch" ocorre quando algo incorreto é executado
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CEP.")
      setInput("")
    }
  }
  return ( //propriedades do botão de busca
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
      </button>
    </div>
    {Object.keys(cep).length > 0 && (
      <main className="main">
      <h2>CEP: {cep.cep}</h2>
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf} </span>
      </main>
    )}
    </div>
  );
}
//exporta a função "App"
export default App;