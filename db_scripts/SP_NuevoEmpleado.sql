SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Gunther Karolyi>
-- Create date: <18/4/21>
-- Description:	<Nuevo Empleado>
-- =============================================

CREATE PROCEDURE Nuevo_Empleado 
	
	@idTipoDocumentacionIdentidad int,
	@idPuesto int,
	@IdDepartamento int,
	@ValorDocumentoIdentidad int,
	@Nombre varchar(64),
	@FechaNacimiento date, 
	@visible bit

AS
BEGIN
	
	SET NOCOUNT ON;

    INSERT INTO Empleado(
	idTipoDocumentacionIdentidad, idPuesto, IdDepartamento, ValorDocumentoIdentidad, Nombre, FechaNacimiento, Visible)
	VALUES(
	@idTipoDocumentacionIdentidad, @idPuesto, @IdDepartamento, @ValorDocumentoIdentidad, @Nombre, @FechaNacimiento, @visible
	)

END
GO
