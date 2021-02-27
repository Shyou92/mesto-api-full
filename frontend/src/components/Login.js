import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data)
      .then(() => history.push('/'))
      .catch((err) => console.log(err));
  };

  return (
    <div className='register' onSubmit={handleSubmit}>
      <h2 className='register__heading'>Вход</h2>
      <form className='register__form'>
        <input
          className='popup__input popup__input_dark'
          type='email'
          name='email'
          placeholder='Email'
          value={data.email}
          onChange={handleChange}
          noValidate
        />
        <input
          className='popup__input popup__input_dark'
          type='password'
          name='password'
          placeholder='Пароль'
          value={data.password}
          onChange={handleChange}
          noValidate
        />
        <button className='register__form-submit' type='submit'>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
