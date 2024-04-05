import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style/listclinic.css';
function ListClinic() {
  // Guarda e atualiza as informações recebidas do backend.
  const [result, setResult] = useState([]);

  // Faz a solicitação das informações no backend quando a página é carrgada.
  useEffect(() => {
    fetch("http://localhost:7700")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Detecta em qual cartão de informação estamos clicando, obém o ProductID e o envia para o backend, que será responsável por excluir os dados do bd.

  const handleDelete = (e) => {
    console.log(e.target.name);
    // Pergunta se temos certeza de que desejamos excluir as informaçõe.
    /* eslint-disable no-restricted-globals */
    if (confirm("Tem certeza que deseja excluir estas informações?")) {
      // Se confirmar a pergunta anterior, envia as informações para o backend.
      console.log("Informação excluída");
      fetch("http://localhost:7700", {
        method: "DELETE",
        body: JSON.stringify({
          ClinicID: e.target.name,
        }),
        headers: { "Content-Type": "application/json" },
      });
      // Atualiza a página para atualizar os dados do bd.
      window.location.reload();
      /* eslint-disable no-restricted-globals */
    } else {
      console.log("Pedido de exclusão cancelado.");
    }
  };

  return (
    <div className="results">
      <h1 className="title_results">Resultados</h1>
      <section className="section_all_results">
        {result.map((item, index) => (
          <section key={index} className="section_individual_result">
            <article>
              <p className="p_results">Nome</p>
              <p className="product_result">{item.Nome}</p>
              <p className="p_results">Endereço</p>
              <p className="product_result">{item.Endereco}</p>
              <p className="p_results">Email</p>
              <p className="product_result">{item.Email}</p>
              <p className="p_results">CNPJ</p>
              <p className="product_result">{item.CNPJ}</p>
            </article>
            <div className="div_buttons_results">
              <Link to={`/modify/${item.ClinicID}`}>
                <button className="modify_results">modifcar</button>
              </Link>
              <button
                name={item.ClinicID}
                onClick={handleDelete}
                className="delete_results"
              >
                Excluir
              </button>
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

export default ListClinic;