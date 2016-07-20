CREATE TABLE [dbo].[Clients]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(200) NOT NULL, 
	[BillName] NVARCHAR(200) NULL, 
	[ClientTypeId] INT NOT NULL, 
	[IndustryId] INT NOT NULL, 
	[AttorneyId] INT NOT NULL, 
	[Notes] NTEXT NULL, 
	[Status] TINYINT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL, 
	CONSTRAINT [FK_Clients_ToClientTypes] FOREIGN KEY ([ClientTypeId]) REFERENCES [ClientTypes]([Id]), 
	CONSTRAINT [FK_Clients_ToIndustries] FOREIGN KEY ([IndustryId]) REFERENCES [Industries]([Id]), 
	CONSTRAINT [FK_Clients_ToAttorneys] FOREIGN KEY ([AttorneyId]) REFERENCES [Employees]([Id])
)