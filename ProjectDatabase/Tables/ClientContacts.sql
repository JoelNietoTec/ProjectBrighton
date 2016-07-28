CREATE TABLE [dbo].[ClientContacts]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
	[ClientId] INT NOT NULL, 
	[Correlative] INT NOT NULL, 
	[Name] NVARCHAR(100) NOT NULL, 
	[Position] NVARCHAR(50) NULL, 
	[Address] NVARCHAR(200) NULL, 
	[OfficePhone] NVARCHAR(20) NULL, 
	[MobilePhone] NVARCHAR(20) NULL,
	[FaxNumber] NVARCHAR(20) NULL, 
	[Email] NVARCHAR(50) NULL, 
	[CreateDate] DATETIME NULL, 
	[ModifyDate] DATETIME NULL, 
	CONSTRAINT [ClientContacts_Key] UNIQUE ([ClientId], [Correlative]), 
	CONSTRAINT [FK_ClientContacts_ToClients] FOREIGN KEY ([ClientId]) REFERENCES [Clients]([Id])
)

GO
