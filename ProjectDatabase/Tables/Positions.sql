CREATE TABLE [dbo].[Positions]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(50) NOT NULL, 
	[Description] NTEXT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[CreateDatePositions]
	ON [dbo].[Positions]
	FOR INSERT
	AS
	BEGIN
		UPDATE [dbo].[Positions]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END
GO

CREATE TRIGGER [dbo].[ModifyDatePositions]
	ON [dbo].[Positions]
	FOR UPDATE
	AS
	BEGIN
		IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[Positions]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END