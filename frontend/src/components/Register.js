import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ onRegister, onRegisterPopup }) => {
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
    onRegister(data)
      .then((res) => {
        return res;
      })
      .then(() => history.push('/sign-in'))
      .catch((err) => console.log(err));
  };

  return (
    <div className='register' onSubmit={handleSubmit}>
      <h2 className='register__heading'>Регистрация</h2>
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
        <button className='register__form-submit' onClick={onRegisterPopup}>
          Зарегистрироваться
        </button>
      </form>
      <p className='register__text'>
        Уже зарегистрированы?
        <Link className='register__link' to='sign-in'>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;
