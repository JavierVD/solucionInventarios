CREATE DATABASE solucionInventarios;
GO

USE [solucionInventarios]
GO

/****** Object:  Table [dbo].[articulo]    Script Date: 12/04/2023 03:42:00 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[articulo](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[descripcion] [varchar](100) NOT NULL,
	[stock] [int] NOT NULL,
	[uri] [text] NULL,
	[estado] [bit] NOT NULL,
	[idTipo] [int] NOT NULL,
	[idMarca] [int] NOT NULL,
	[modelo] [varchar](100) NULL,
	[noSerie] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[articulo] ADD  DEFAULT ((0)) FOR [stock]
GO

ALTER TABLE [dbo].[articulo] ADD  DEFAULT ((1)) FOR [estado]
GO

ALTER TABLE [dbo].[articulo]  WITH CHECK ADD  CONSTRAINT [FK_articulo_marca] FOREIGN KEY([idMarca])
REFERENCES [dbo].[marca] ([id])
GO

ALTER TABLE [dbo].[articulo] CHECK CONSTRAINT [FK_articulo_marca]
GO

ALTER TABLE [dbo].[articulo]  WITH CHECK ADD  CONSTRAINT [FK_articulo_tipo] FOREIGN KEY([idTipo])
REFERENCES [dbo].[tipo] ([id])
GO

ALTER TABLE [dbo].[articulo] CHECK CONSTRAINT [FK_articulo_tipo]
GO

USE [solucionInventarios]
GO

/****** Object:  Table [dbo].[marca]    Script Date: 12/04/2023 03:42:29 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[marca](
	[id] [int] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[uri] [text] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

USE [solucionInventarios]
GO

/****** Object:  Table [dbo].[tipo]    Script Date: 12/04/2023 03:43:05 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tipo](
	[id] [int] NOT NULL,
	[descripcion] [varchar](50) NULL,
	[icon] [text] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO


USE [solucionInventarios]
GO

/****** Object:  Table [dbo].[transaccion]    Script Date: 12/04/2023 03:43:26 p. m. ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[transaccion](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[fecha] [date] NOT NULL,
	[idArticulo] [int] NOT NULL,
	[tipo] [varchar](3) NOT NULL,
	[cantidad] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[transaccion]  WITH CHECK ADD FOREIGN KEY([idArticulo])
REFERENCES [dbo].[articulo] ([id])
GO

ALTER TABLE [dbo].[transaccion]  WITH CHECK ADD  CONSTRAINT [FK_articulo] FOREIGN KEY([idArticulo])
REFERENCES [dbo].[articulo] ([id])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[transaccion] CHECK CONSTRAINT [FK_articulo]
GO

