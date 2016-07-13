CREATE TABLE [dbo].[MatterTypes]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(50) NOT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[CreateDateMatterTypes]
	ON [dbo].[MatterTypes]
	FOR INSERT
	AS
	BEGIN
		UPDATE [dbo].[MatterTypes]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END
GO

CREATE TRIGGER [dbo].[ModifyDateMatterTypes]
	ON [dbo].[MatterTypes]
	FOR UPDATE
	AS
	BEGIN
		IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[MatterTypes]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END