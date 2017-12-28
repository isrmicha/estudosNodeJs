var express = require('express');
var path = require('path');
var PORT = process.env.PORT || 3000;
var cors = require('cors');
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
var bodyParser = require('body-parser');
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
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
  .get('/api/users/:id', (req, res) => {
    var id = req.params.id;
    pool.query(`SELECT * FROM users WHERE id=${id}`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
  })
  .post('/api/users', (req, res) => {
    var nome = req.body.nome;
    pool.query(`INSERT INTO users (nome) VALUES ('${nome}')`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
  })
  .put('/api/users/:id/:nome', (req, res) => {
    var id = req.params.id;
    var nome = req.params.nome;
    pool.query(`UPDATE users SET nome='${nome}' WHERE id=${id}`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
  })
  .delete('/api/users/:id', (req, res) => {
    var id = req.params.id;
    pool.query(`DELETE FROM users WHERE id=${id}`, function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT } em ${novaDataAtual()}`));
pingarServidor();
setInterval(() => {
  pingarServidor();
}, 15 * 60 * 1000);

function pingarServidor() {
  rp(URLtoPing)
    .then(function (htmlString) {
      console.log(`Pingado com sucesso! em ${novaDataAtual()}`);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function novaDataAtual (){
  return `${new Date().getFullYear()}-${(new Date().getMonth()+1)}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
}