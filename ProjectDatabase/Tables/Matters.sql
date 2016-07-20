CREATE TABLE [dbo].[Matters]
(
	[Id] INT NOT NULL PRIMARY KEY, 
	[ClientId] INT NOT NULL, 
	[AttorneyId] INT NOT NULL,
	[MatterTypeId] INT NOT NULL, 
	[Title] NVARCHAR(150) NULL, 
	[Description] NCHAR(10) NULL, 
	[OpeningDate] DATE NULL, 
	[AdvanceBalance] MONEY NULL, 
	[StatusId] INT NOT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL, 
	CONSTRAINT [FK_Matters_ToClients] FOREIGN KEY ([ClientId]) REFERENCES [Clients]([Id]), 
	CONSTRAINT [FK_Matters_ToAttorneys] FOREIGN KEY ([AttorneyId]) REFERENCES [Employees]([Id]), 
	CONSTRAINT [FK_Matters_ToMatterTypes] FOREIGN KEY ([MatterTypeId]) REFERENCES [MatterTypes]([Id])
)