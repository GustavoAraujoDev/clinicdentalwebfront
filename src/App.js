// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddDentistForm from './components/AddDentistForm';
import DentistList from './components/DentistList';
import Home from './components/Home';
import AddClinicForm from './components/AddClinic';
import ListClinic from './components/ClinicList';
import AddFuncionarioForm from './components/AddFuncionario';
import ListFuncionario from './components/FuncionarioList';
import AddDespesaForm from './components/AddDespesa';
import ListDespesa from './components/DespesaList';
import Login from './components/login';
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-dentist" element={<AddDentistForm />} />
          <Route path="/dentists" element={<DentistList />} />
          <Route path="/add-dentist/:id" element={<AddDentistForm />} />
          <Route path="/add-clinic" element={<AddClinicForm />} />
          <Route path="/clinics" element={<ListClinic />} />
          <Route path="/add-clinic/:id" element={<AddClinicForm />} />
          <Route path="/add-funcionari" element={<AddFuncionarioForm />} />
          <Route path="/funcionaris" element={<ListFuncionario />} />
          <Route path="/add-funcionari/:id" element={<AddFuncionarioForm />} />
          <Route path="/add-despese" element={<AddDespesaForm />} />
          <Route path="/despeses" element={<ListDespesa />} />
          <Route path="/add-despese/:id" element={<AddFuncionarioForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
