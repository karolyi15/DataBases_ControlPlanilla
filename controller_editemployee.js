import {connect} from 'server.js';

function getEmployeeData(){

    var Nombre = document.getElementById("Name").value;
    var idTipoDocumentacionIdentidad = document.getElementById("IdType").value;
    var ValorDocumentoIdentidad = document.getElementById("IdValue").value;
    var idPuesto = document.getElementById("IdJob").value;
    var IdDepartamento = document.getElementById("IdDepartment").value;
    var FechaNacimiento = "2017-06-15";

    var json = {"Nombre":Nombre, "idTipoDocumentacionIdentidad":idTipoDocumentacionIdentidad, "ValorDocumentoIdentidad":ValorDocumentoIdentidad, "idPuesto":idPuesto, "IdDepartamento":IdDepartamento,"FechaNacimiento":FechaNacimiento };

    connect(1, json);    
}


