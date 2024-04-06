import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/adddespesa.css';
import {toast} from "react-toastify";

function AddDespesaForm() {
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    Nome: "",
    Descricao: "",
    Data: "",
    Valor: "",
  });
  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:6600/despesa")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);

        const foundItem = data.find(
          (item) => window.location.pathname === `/modify/${item.id}`
        );

        if (foundItem) {
          setDataToInsert((prevState) => ({
            ...prevState,
            ...foundItem,
          }));
        } else {
          if (!redirected) {
            setRedirected(true);

          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    const foundItem = result.find(
      (item) => window.location.pathname === `/modify/${item.id}`
    );
    if (foundItem) {
      fetch("http://localhost:6600/despesa", {
        method: "PUT",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          
          clearForm(); // Limpar os campos após o envio
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:6600/despesa", {
        method: "POST",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          toast.success('Despesa Cadastrada Com Sucesso');
          clearForm(); // Limpar os campos após o envio
        })
        .catch((error) => console.error("Error:", error));
    }
    e.preventDefault(); // Evitar recarregamento da página
  };

  const handleChange = (e) => {
    setDataToInsert({
      ...dataToInsert,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setDataToInsert({
      Nome: "",
      Descricao: "",
      Data: "",
      Valor: "",
    });
  };

  return (
    <div className="form_div">
      <form onSubmit={handleSubmit} className="form">
        <h2>Cadastro de Despesa</h2>
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Nome}
          name="Nome"
          onChange={handleChange}
          placeholder="Nome"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="Descricao"
          value={dataToInsert.Descricao}
          name="Descricao"
          onChange={handleChange}
          placeholder="Descricao"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="date"
          value={dataToInsert.Data}
          name="Data"
          onChange={handleChange}
          placeholder="Data"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Valor}
          name="Valor"
          onChange={handleChange}
          placeholder="Valor"
          required
          autoComplete="none"
        />
        <div>
          <button type="submit" className="form_button">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDespesaForm;
