//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//globals
const PORT = 5000;
const pool = require( './modules/pool' );
//let taskList = []

// Start listening for requests on a specific port
app.listen(PORT, ()=>{
  console.log('listening on port', PORT);
});

//routes

app.get('/taskList', (req, res)=>{
    const queryString = `SELECT * FROM tasklist`;
    pool.query( queryString ).then( (results)=> {
      res.send(results.rows );
    }).catch( (err )=>{
      console.log( err);
      res.sendStatus( 500);
    })
  })

app.post('/taskList', (req, res)=>{
    console.log('/taskList POST:', req.body);
    const queryString = 'INSERT INTO tasklist (task, done) VALUES( $1, $2)';
    const values = [req.body.task, req.body.done];
    pool.query( queryString, values).then( (results)=>{
      res.sendStatus( 201);
    }).catch( (err)=>{
      console.log( "err");
      res.sendStatus( 500);
    })

})