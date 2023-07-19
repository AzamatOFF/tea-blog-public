const React = require('react');
const Layout = require('./Layout');

function Signin(props) {
  return (
    <Layout
      {...props}
    >
      <div className="logPage">
        <div className="logContainer">
          <h1>Войти</h1>
          <form name="formSignin" className="formSignin">
            <input type="email" name="email" placeholder="Введите email" required />
            <input type="password" name="password" className="errorPlace" placeholder="Введите пароль" required />
            <button className="btnSign" type="submit">Войти</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

module.exports = Signin;
