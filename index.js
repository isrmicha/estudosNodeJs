const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
var rp = require('request-promise');
var URLtoPing = 'https://estudosnodejs.herokuapp.com/';
// mysql://b6bacdc0cf0fab:a8153863@us-cdbr-iron-east-05.cleardb.net/heroku_aa33d39064ed0f2?reconnect=true
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b6bacdc0cf0fab',
  password: 'a8153863',
  database: 'heroku_aa33d39064ed0f2'
});
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('public');
  })
  .get('/api/users', (req, res) => {
    pool.query('SELECT * FROM users', function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
pingarServidor();
setInterval(() => {
  pingarServidor();
}, 29 * 60 * 1000);

function pingarServidor() {
  console.log(`Pingando ${URLtoPing} para acordar em ${new Date()}`);
  rp(URLtoPing)
    .then(function (htmlString) {
      console.log("Pingado com sucesso!");
    })
    .catch(function (err) {
      console.log(err);
    });
}