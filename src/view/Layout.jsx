const React = require("react");
const Navbar = require("./Navbar");
require("dotenv").config();

function Layout({ title, children, user }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script
          src={`https://api-maps.yandex.ru/2.1/?apikey=${process.env.API_KEY}&lang=ru_RU`}
          type="text/javascript"
        />
        <link rel="stylesheet" type="text/css" href="/css/styles.css" />
        <link rel="stylesheet" type="text/css" href="/css/userPageStyle.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Delius+Unicase:wght@400;700&family=IBM+Plex+Mono:ital,wght@0,100;0,600;1,100&display=swap"
          rel="stylesheet"
        />
        <title>{title}</title>
      </head>
      <header>
        <Navbar user={user} />
      </header>
      <body>{children}</body>
      <script src="/js/app.js" />
    </html>
  );
}

module.exports = Layout;
