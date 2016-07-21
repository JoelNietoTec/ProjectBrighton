﻿CREATE TABLE [dbo].[MatterTypes]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(50) NOT NULL, 
	[Description] NTEXT NULL,
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL
)