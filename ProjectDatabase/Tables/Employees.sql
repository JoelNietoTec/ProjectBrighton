CREATE TABLE [dbo].[Employees]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(150) NOT NULL, 
	[PositionId] INT NOT NULL,
	[HourRate] MONEY NULL,
	[StartDate] DATE NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL, 
	CONSTRAINT [FK_Employees_ToPositions] FOREIGN KEY ([PositionId]) REFERENCES [Positions]([Id]) 
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
	@value = N'Employees (Timekeepers)',
	@level0type = N'SCHEMA',
	@level0name = N'dbo',
	@level1type = N'TABLE',
	@level1name = N'Employees',
	@level2type = NULL,
	@level2name = NULL
GO

CREATE TRIGGER [dbo].[CreateDateEmployees]
	ON [dbo].[Employees]
	FOR INSERT
	AS
	BEGIN
		UPDATE [dbo].[Employees]
		SET CreateDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END
GO

CREATE TRIGGER [dbo].[ModifyDateEmployees]
	ON [dbo].[Employees]
	FOR UPDATE
	AS
	BEGIN
		IF NOT UPDATE(CreateDate)
		UPDATE [dbo].[Employees]
		SET ModifyDate = GETDATE()
		WHERE Id IN (SELECT Id FROM inserted)
	END