import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../style/adddentist.css'
import {toast} from "react-toastify";

function AddClinicForm() {
  const [result, setResult] = useState([]);
  const [dataToInsert, setDataToInsert] = useState({
    Nome: "",
    Email: "",
    Endereco: "",
    CNPJ: "",
  });
  const [redirected, setRedirected] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:6600/clinica")
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
      fetch("http://localhost:6600/clinica", {
        method: "PUT",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          clearForm(); // Limpar os campos após o envio
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:6600/clinica", {
        method: "POST",
        body: JSON.stringify(dataToInsert),
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          toast.success('clinica Cadastrada Com Sucesso');
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
      Email: "",
      Endereco: "",
      CNPJ: "",
    });
  };

  return (
    <div className="form_div">
      <form onSubmit={handleSubmit} className="form">
        <h2> Cadastro de Clinicas </h2>
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
          value={dataToInsert.Endereco}
          name="Endereco"
          onChange={handleChange}
          placeholder="Endereço"
          required
          autoComplete="none"
        />
        <input
          className="form_input"
          type="text"
          value={dataToInsert.CNPJ}
          name="CNPJ"
          onChange={handleChange}
          placeholder="CNPJ"
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

export default AddClinicForm;
