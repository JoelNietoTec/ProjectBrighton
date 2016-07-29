CREATE TABLE [dbo].[Clients]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[Name] NVARCHAR(200) NOT NULL, 
	[BillName] NVARCHAR(200) NULL, 
	[ClientTypeId] INT NOT NULL, 
	[IndustryId] INT NOT NULL, 
	[EmployeeId] INT NOT NULL, 
	[Email] VARCHAR(50) NULL, 
	[Notes] NTEXT NULL, 
	[Status] TINYINT NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL, 
	[CountryId] INT NOT NULL, 
	CONSTRAINT [FK_Clients_ToClientTypes] FOREIGN KEY ([ClientTypeId]) REFERENCES [ClientTypes]([Id]), 
	CONSTRAINT [FK_Clients_ToIndustries] FOREIGN KEY ([IndustryId]) REFERENCES [Industries]([Id]), 
	CONSTRAINT [FK_Clients_ToEmployees] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees]([Id]), 
	CONSTRAINT [FK_Clients_ToCountries] FOREIGN KEY ([CountryId]) REFERENCES [Countries]([Id])
)