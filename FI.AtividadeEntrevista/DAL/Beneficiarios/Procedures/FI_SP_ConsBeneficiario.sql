﻿CREATE PROC FI_SP_ConsBeneficiario
	@IDCLIENTE BIGINT
AS
BEGIN
	IF(ISNULL(@IDCLIENTE,0) = 0)
		SELECT CPF, NOME, ID, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK)
	ELSE
		SELECT CPF, NOME, ID, IDCLIENTE FROM BENEFICIARIOS WITH(NOLOCK) WHERE IDCLIENTE = @IDCLIENTE
END