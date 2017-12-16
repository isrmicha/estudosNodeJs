const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
var rp = require('request-promise');
var URLtoPing = 'https://estudosnodejs.herokuapp.com/';
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('public');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  pingarServidor();
setInterval(()=>{
  pingarServidor();
}, 29 * 60 * 1000)

function pingarServidor (){
  console.log(`Pingando ${URLtoPing} para acordar em ${new Date()}`);
  rp(URLtoPing)
    .then(function (htmlString) {
        console.log(htmlString);
    })
    .catch(function (err) {
      console.log(err);
    });
}
