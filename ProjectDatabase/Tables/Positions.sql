CREATE TABLE [dbo].[Positions]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Description] NTEXT NULL, 
    [CreateDate] DATETIME NULL, 
    [ModifyDate] DATETIME NULL
)

GO

CREATE TRIGGER [dbo].[CreateDate_Positions]
    ON [dbo].[Positions]
    FOR INSERT
    AS
    BEGIN
		Update [dbo].[Positions]
		Set CreateDate = GETDATE()
		Where Id IN (Select Id from inserted)
    END
GO

CREATE TRIGGER [dbo].[ModifyDate_Positions]
    ON [dbo].[Positions]
    FOR UPDATE
    AS
    BEGIN
        Update [dbo].[Positions]
		Set ModifyDate = GETDATE()
		Where Id IN (Select Id From inserted)
    END