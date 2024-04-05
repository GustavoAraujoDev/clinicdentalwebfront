import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/addfuncionario.css'
import {toast} from "react-toastify";

function AddFuncionarioForm() {
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    Nome: "",
    Email: "",
    Telefone: "",
    CPF: "",
    Idade: "",
  });
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5500")
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
      fetch("http://localhost:5500", {
        method: "PUT",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          clearForm(); // Limpar campos após o envio
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:5500", {
        method: "POST",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          toast.success('Clinica Cadastrada Com Sucesso');
          clearForm(); // Limpar campos após o envio
        })
        .catch((error) => console.error("Error:", error));
    }
    e.preventDefault(); // Evitar recarregar a página
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
        Email: "",
        Telefone: "",
        CPF: "",
        Idade: "",
    });
  };

  return (
    <div className="form_div">
      <form onSubmit={handleSubmit} className="form">
        <h2>Cadastro de Funcionario</h2>
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
          type="email"
          value={dataToInsert.Email}
          name="Email"
          onChange={handleChange}
          placeholder="Email"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Telefone}
          name="Telefone"
          onChange={handleChange}
          placeholder="Telefone"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.CPF}
          name="CPF"
          onChange={handleChange}
          placeholder="CPF"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.Idade}
          name="Idade"
          onChange={handleChange}
          placeholder="Idade"
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

export default AddFuncionarioForm;
