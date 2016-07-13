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

GO

CREATE TRIGGER [dbo].[CreateDateMatters]
	ON [dbo].[Matters]
	FOR INSERT
	AS
	BEGIN
		UPDATE [dbo].[Matters]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END
GO

CREATE TRIGGER [dbo].[ModifyDateMatters]
	ON [dbo].[Matters]
	FOR UPDATE
	AS
	BEGIN
		IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[Matters]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)

	END