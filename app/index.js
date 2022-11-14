const mysql = require('mysql')
const express = require('express')
const app = express()
const port = 3000


const con = mysql.createConnection({
    host: 'db',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'appdb'
});


con.connect((err) => {
    if (err) {
        console.log('Erro connecting to database...', err)
        return
    }
    console.log('Connection established!')
})


app.get('/favicon.ico', function(req, res) { 
    res.sendStatus(204); 
});

app.get('/:name', (request, response) => {
    
    con.query(
        'INSERT INTO people SET ?', {name: request.params.name}, (err, res) => {
        if (err) throw err
        console.log(`New People added with ID: ${res.insertId}`)
    })

    con.query("SELECT * FROM appdb.people", function (err, result, fields) {
        if (err) throw err;

        responseBody = "<h1>Full Cycle Rocks!</h1><ul>"
        result.forEach(registry => {
            responseBody += `<li>${registry.name}</li>`
        })
        responseBody += "</ul>"

        response.send(responseBody)
    });

})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})