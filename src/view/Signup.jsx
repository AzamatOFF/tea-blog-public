const React = require('react');
const Layout = require('./Layout');

function Signup(props) {
  return (
    <Layout
      {...props}
    >
      <div className="regPage">
        <h1>Регистрация</h1>
        <form name="formSignup" className="formSignup">
          <input type="text" name="name" placeholder="Введите имя" />
          <input type="email" name="email" placeholder="Введите email" required />
          <input
            type="password"
            name="password"
            className="errorPlace"
            placeholder="Введите пароль"
            required
          />
          <button className="btnSign" type="submit">Зарегестрироваться</button>
        </form>
      </div>
    </Layout>
  );
}

module.exports = Signup;
