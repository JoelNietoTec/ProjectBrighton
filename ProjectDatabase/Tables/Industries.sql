CREATE TABLE [dbo].[Industries]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(50) NOT NULL, 
	[Description] NTEXT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[CreateDateIndustries]
	ON [dbo].[Industries]
	FOR INSERT
	AS
	BEGIN
		UPDATE [dbo].[Industries]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END
GO

CREATE TRIGGER [dbo].[ModifyDateIndustries]
	ON [dbo].[Industries]
	FOR UPDATE
	AS
	BEGIN
		IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[Industries]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END