import React, { useState } from 'react';
import '../style/login.css'; // Importar o arquivo CSS para estilização
import {toast} from "react-toastify";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3480/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      
        if (response.ok) {
          toast.success('Login Realizado Com Sucesso');
            // Se o login for bem-sucedido, redirecione para a página home
            window.location.href = '/home';
          }
      

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3480/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message);
      toast.success('Usuario Registrado Com Sucesso');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container"> {/* Adicionar uma classe para o container */}       
      <img src="https://www.creativefabrica.com/wp-content/uploads/2021/02/10/Dental-Health-Graphics-8511319-1-580x387.jpg" alt="Logo" className="login-logo" /> {/* Adicionar a imagem do logo */}
      <h1 className="login-heading">Login</h1> {/* Adicionar classe para o título */}
      <input
        className="login-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>Login</button> {/* Adicionar classe para o botão de login */}
      <button className="register-button" onClick={handleRegister}>Register</button> {/* Adicionar classe para o botão de registro */}
      {message && <p className="login-message">{message}</p>} {/* Adicionar classe para a mensagem */}
    </div>
  );
}

export default Login;
