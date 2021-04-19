//Data Base Connection Settings

function connectDB(Name, IdType, IdValue, birthDate, IdJob, IdDepartment){

  const { Connection, Request, TYPES } = require('tedious');

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

    const storedProcedure = 'dbo.Nuevo_Empleado';
    
    connection.connect(function(err) {
      if (err) {
        console.log('Connection Failed!');
        throw err;
      }
    
      const request = new Request(storedProcedure, (err) => {
        if (err) {
          throw err;
        }
    
        console.log('DONE!');
        connection.close();
      });
    
      
      request.addParameter('idTipoDocumentacionIdentidad', TYPES.Int, IdType);
      request.addParameter('idPuesto', TYPES.Int, IdJob);
      request.addParameter('IdDepartamento', TYPES.Int, IdDepartment);
      request.addParameter('ValorDocumentoIdentidad', TYPES.Int, IdValue);
      request.addParameter('Nombre', TYPES.VarChar, Name);
      request.addParameter('FechaNacimiento', TYPES.Date,birthDate);
      request.addParameter('visible', TYPES.Bit, 1);
      //request.addOutputParameter('outputCount', TYPES.Int);
    
      request.on('returnValue', (paramName, value, metadata) => {
        console.log(paramName + ' : ' + value);
      });
    
      connection.callProcedure(request);
    
    });


}

function nuevo_Empleado(Name, IdType, IdValue, birthDate, IdJob, IdDepartment){

  /*var Name = document.getElementById("Name");
  var IdType = document.getElementById("IdType");
  var IdValue = document.getElementById("IdValue");
  var birthDate = document.getElementById("birthDate");
  var IdJob = document.getElementById("IdJob");
  var IdDepartment = document.getElementById("IdDepartment");*/


  const request = new Request(storedProcedure, (err) => {
    if (err) {
      throw err;
    }

    console.log('DONE!');
    connection.close();
  });

  
  request.addParameter('idTipoDocumentacionIdentidad', TYPES.Int, IdType);
  request.addParameter('idPuesto', TYPES.Int, IdJob);
  request.addParameter('IdDepartamento', TYPES.Int, IdDepartment);
  request.addParameter('ValorDocumentoIdentidad', TYPES.Int, IdValue);
  request.addParameter('Nombre', TYPES.VarChar, Name);
  request.addParameter('FechaNacimiento', TYPES.Date,birthDate);
  request.addParameter('visible', TYPES.Bit, 1);
  //request.addOutputParameter('outputCount', TYPES.Int);

  request.on('returnValue', (paramName, value, metadata) => {
    console.log(paramName + ' : ' + value);
  });

  connection.callProcedure(request);

}

//connectDB("josue", 1, 1, "2010-3-3", 1, 1);