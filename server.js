// Requiring modules
const express = require('express');
const app = express();
const mssql = require("mssql");
  
// Get request
app.get('/', function (req, res) {
  
    // Config your database credential
    const config = {
        user: 'GK',
        password: '123456',
        server: 'localhost',
        database: 'ControlPlanilla'
    };
  
    // Connect to your database
    mssql.connect(config, function (err) {
  
        // Create Request object to preform
        // query operation
        var request = new mssql.Request();
  
        // Query to the database and get the records
        request.query('select * from Users',
            function (err, records) {
  
                if (err) console.log(err)
  
                // Send records as a response
                // to browser
                console.log(records);
                res.send(records);
  
            });
    });
});
  
var server = app.listen(1433, function () {
    console.log('Server is listening at port 1433...');
});