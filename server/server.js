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
    const queryString = `SELECT * FROM tasklist ORDER BY id`;
    pool.query( queryString ).then( (results)=> {
      console.log(results.rows);
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

app.delete( '/taskList', ( req, res )=>{
    console.log( '/taskList delete hit:', req.query );
    const queryString =`DELETE FROM tasklist WHERE id='${ req.query.id }';`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})


app.put( '/taskList', ( req, res )=>{
    console.log( '/taskList PUT hit:', req.query );
    const queryString = `UPDATE "tasklist" SET done=true WHERE id=${ req.query.id };`;
    pool.query( queryString ).then( ( results )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( err );
        res.sendStatus( 500 );
    })
})
