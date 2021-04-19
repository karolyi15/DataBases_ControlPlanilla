var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

    var config = {  
        server: '192.168.0.134',  //update me
        authentication: {
            type: 'default',
            options: {
                userName: 'GK', //update me
                password: '123456'  //update me
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: 'ControlPlanilla',  //update me
            port: 1433,
            trustServerCertificate: true
        }
    };  
    
    
const connection = new Connection(config);

connection.on('connect', (err) => {
  if (err) {
    console.log('Connection Failed');
    throw err;
  }

  executeStatement();
});

connection.connect();

function executeStatement() {
  const request = new Request('select * from Users', (err, rowCount) => {
    if (err) {
      throw err;
    }

    console.log('DONE!');
    connection.close();
  });

  // Emits a 'DoneInProc' event when completed.
  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL');
      } else {

        console.log(column.value);
        
      }
    });
  });

  request.on('done', (rowCount) => {
    console.log('Done is called!');
  });

  request.on('doneInProc', (rowCount, more) => {
    console.log(rowCount + ' rows returned');
  });

  // In SQL Server 2000 you may need: connection.execSqlBatch(request);
  connection.execSql(request);
}