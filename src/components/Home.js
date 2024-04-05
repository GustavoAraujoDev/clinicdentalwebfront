import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/home.css'; 
const Home = () => {

  const [dentistCount, setDentistCount] = useState(0);
  const [clinicCount, setClinicCount] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [EmployeesCount, setEmployeesCount] = useState(0);
  useEffect(() => {
    // Função para buscar o número de dentistas cadastrados
    const fetchDentistCount = async () => {
      try {
          const response = await fetch("http://localhost:6600/totaldentista");
          if (!response.ok) {
              throw new Error("Erro ao buscar número de dentistas: " + response.statusText);
          }
          const data = await response.json();
          console.log(data);
          const totalCountdentista =  data.length;
          setDentistCount(totalCountdentista); // Define a contagem de dentistas com base na resposta do servidor
      } catch (error) {
          console.error(error);
      }
  };

    // Função para buscar o número de clínicas cadastradas
    const fetchClinicCount = async () => {
      try {
        const response = await fetch("http://localhost:7700/totalclinica");
        if (!response.ok) {
            throw new Error("Erro ao buscar número de dentistas: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        const totalCountclinic =  data.length;
        setClinicCount(totalCountclinic); // Define a contagem de dentistas com base na resposta do servidor
    } catch (error) {
        console.error(error);
    }
    };

    // Função para buscar o valor total das despesas
    const fetchTotalExpenses = async () => {
      try {
        const response = await fetch("http://localhost:8800/totaldespesa");
        if (!response.ok) {
          throw new Error("Erro ao buscar o total das despesas: " + response.statusText);
        }
        const data = await response.json();
        const totaldespesa = data.
        console.log(totaldespesa)
        setTotalExpenses(totaldespesa);
      } catch (error) {
        console.error('Erro ao buscar o total das despesas:', error);
      }
    };


    // Função para buscar o valor total das despesas
    const fetchTotalEmployees = async () => {
      try {
        const response = await fetch("http://localhost:5500/totalfuncionario");
        if (!response.ok) {
            throw new Error("Erro ao buscar número de dentistas: " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        const totalCountfuncionario =  data.length;
        setEmployeesCount(totalCountfuncionario); // Define a contagem de dentistas com base na resposta do servidor
    } catch (error) {
        console.error(error);
    }
    };

    fetchDentistCount();
    fetchClinicCount();
    fetchTotalExpenses();
    fetchTotalEmployees();
  },[]);


  return (
    <div className="home-container">
     <header className="header">
  <Link to="/" className="button">Logout</Link>
  <img
    src="https://www.creativefabrica.com/wp-content/uploads/2021/02/10/Dental-Health-Graphics-8511319-1-580x387.jpg"
    className="logo"
    alt="Logo"
  />
  <h3 className="clinic-name">Clinic Dental</h3>
</header>
      <div className="content">
        <h2>Welcome to Clinic Dental</h2>
        <p>This is the home page of our Clinic Dental application.</p>
        <p>Use the buttons below to manage dentists:</p>
        <div className="overview">
          <h3>Visão Geral</h3>
          <p>Número de dentistas cadastrados: {dentistCount}</p>
          <p>Número de clínicas cadastradas: {clinicCount}</p>
          <p>Valor total das despesas: R$ {totalExpenses}</p>
          <p>Número de Funcionarios Cadastrados: {EmployeesCount}</p>
        </div>
        <div className="button-container">
          <Link to="/add-dentist" className="button">Adicionar Dentista</Link>
          <Link to="/dentists" className="button">Lista de Dentistas</Link>
          <Link to="/add-clinic" className='button'>Adicionar Clinica</Link>
          <Link to="/clinics" className='button'>Lista de Clinica</Link>
          <Link to="/add-funcionari" className='button'>Adicionar Funcionario</Link>
          <Link to="/funcionaris" className='button'>Lista de Funcionario</Link>
          <Link to="/add-despese" className='button'> Adicionar Despesa</Link>
          <Link to="/despeses" className='button'>Lista de Despesa</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
