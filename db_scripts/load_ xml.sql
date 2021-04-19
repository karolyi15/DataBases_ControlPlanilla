DECLARE @datos xml
 
SELECT @datos = C
FROM OPENROWSET (BULK 'C:\Users\karol\Downloads\Catalogo_con_ID_BD.xml', SINGLE_BLOB) AS Datos(C)
    
SELECT @datos
    
DECLARE @hdoc int
    
EXEC sp_xml_preparedocument @hdoc OUTPUT, @datos

Insert into Puesto
SELECT *
FROM OPENXML (@hdoc,  'Datos/Catalogos/Puestos/Puesto', 1)
WITH(

    Nombre VARCHAR(64),
	SalarioXHora Float, 
	Visible bit
    )

Insert into Departamento
SELECT *
FROM OPENXML (@hdoc,  'Datos/Catalogos/Departamentos/Departamento', 1)
WITH(
    Id int,
    Nombre VARCHAR(64), 
	Visible bit
    )    
   
Insert into TipoDocumentoIdentidad
SELECT *
FROM OPENXML (@hdoc,  'Datos/Catalogos/Tipos_de_Documento_de_Identificacion/TipoIdDoc', 1)
WITH(
    Id int,
    Nombre VARCHAR(64)
    )    
    
Insert into Empleado
SELECT *
FROM OPENXML (@hdoc,  'Datos/Empleados/Empleado', 1)
WITH(
    idTipoDocumentacionIdentidad int,
    idPuesto int,
	IdDepartamento int,
	ValorDocumentoIdentidad int,
	Nombre varchar(64),
	FechaNacimiento date, 
	Visible bit
    )    
    
Insert into Usuarios
SELECT *
FROM OPENXML (@hdoc,  'Datos/Usuarios/Usuario', 1)
WITH(
    username varchar(64),
	pwd varchar(64), 
	tipo int
    )  

EXEC sp_xml_removedocument @hdoc



USE [ControlPlanilla]
GO
UPDATE [dbo].[Puesto]
   SET [Visible] = 1
 WHERE [Visible] is null
GO

GO
UPDATE [dbo].[Departamento]
   SET [Visible] = 1
 WHERE [Visible] is null
GO

GO
UPDATE [dbo].[Empleado]
   SET [Visible] = 1
 WHERE [Visible] is null
GO