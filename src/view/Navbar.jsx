const React = require('react');

function Navbar(props) {
  const { user } = props;
  return (
    <header>
      <div className="super_navbar">
        <img className="logo" src="/images/Untitled_logo_1_free-file_(1)-transformed.png" alt="logo" />
        <div className="navContainer">
          <div className="navContent"><a href="/">Главная</a></div>
          {user ? (

            (user.isAdmin === true) ? (<><div className="navContent"><a href="/admin">Кабинет админа</a></div><div className="navContent"><a href="/user">Личный кабинет</a></div></>
            ) : (<div className="navContent"><a href="/user">Личный кабинет</a></div>)

          ) : (
            <div className="navContent">
              <a href="/auth/signup">
                Регистрация
              </a>
            </div>
          )}
          {user ? (
            <div className="navContent"><a href="/auth/logout">Выйти</a></div>
          ) : (
            <div className="navContent">
              <a href="/auth/signin">
                Войти
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

module.exports = Navbar;
