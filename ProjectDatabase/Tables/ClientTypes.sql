CREATE TABLE [dbo].[ClientTypes]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [CreateDate] DATETIME NULL, 
    [ModifyDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[CreateDateClientTypes]
    ON [dbo].[ClientTypes]
    FOR INSERT
    AS
    BEGIN
        UPDATE [dbo].[ClientTypes]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
    END
GO

CREATE TRIGGER [dbo].[ModifyDateClientTypes]
    ON [dbo].[ClientTypes]
    FOR UPDATE
    AS
    BEGIN
        IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[ClientTypes]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
    END