const React = require('react');
const Layout = require('./Layout');

function Home(props) {
  return (
    <Layout {...props}>
     <h1 className="homeH1">Выбери свой чай</h1>
     <div id="map" />
      <script src="/js/viewMap.js" />
    </Layout>
  );
}

module.exports = Home;
