const { formSignup } = document.forms;
const { formSignin } = document.forms;

formSignup?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const res = await fetch('/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  const status = await res.json();
  const isSpan = document.querySelector('.spanError');
  if (status.error) {
    if (!isSpan) {
      const errorPlace = document.getElementsByClassName('errorPlace')[0];
      const spanError = document.createElement('span');
      spanError.className = 'spanError';
      spanError.innerText = 'Пользователь с таким email уже существует';
      errorPlace.after(spanError);
    }
  } else {
    window.location.href = '/home';
  }
});

formSignin?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const res = await fetch('/auth/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const status = await res.json();
  const isSpan = document.querySelector('.spanError');
  if (status.error) {
    if (!isSpan) {
      const errorPlace = document.getElementsByClassName('errorPlace')[0];
      const spanError = document.createElement('span');
      spanError.className = 'spanError';
      spanError.innerText = 'Неверный логин или пароль';
      errorPlace.after(spanError);
    }
  } else {
    window.location.href = '/home';
  }
});
