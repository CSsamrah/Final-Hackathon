import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/signup', { // Adjust the URL based on your API setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // Handle successful registration (e.g., redirect to login)
        navigate('/');
      } else {
        // Handle errors (e.g., show error message)
        setError(result.msg || 'An error occurred');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <section className='register'>
      <div className='container'>
        <form className='form register-form' onSubmit={submitHandler}>
          <img src={Logo} alt="Navbar Logo" className='register-img' />
          <input
            type='text'
            placeholder='Full name'
            name='name'
            value={userData.name}
            onChange={changeInputHandler}
            autoFocus
            required
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={userData.email}
            onChange={changeInputHandler}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={userData.password}
            onChange={changeInputHandler}
            required
          />
          <input
            type='password'
            placeholder='Confirm password'
            name='password2'
            value={userData.password2}
            onChange={changeInputHandler}
            required
          />
          <button type='submit' className='btn register'>Register</button>
          {error && <p className='error'>{error}</p>}
        </form>
        <small>Already have an account? <Link to='/'>Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
