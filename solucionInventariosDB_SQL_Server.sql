USE [solucionInventarios]
GO
/****** Object:  Table [dbo].[articulo]    Script Date: 12/04/2023 04:19:50 p. m. ******/
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
/****** Object:  Table [dbo].[marca]    Script Date: 12/04/2023 04:19:50 p. m. ******/
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
/****** Object:  Table [dbo].[tipo]    Script Date: 12/04/2023 04:19:50 p. m. ******/
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
/****** Object:  Table [dbo].[transaccion]    Script Date: 12/04/2023 04:19:50 p. m. ******/
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
SET IDENTITY_INSERT [dbo].[articulo] ON 

INSERT [dbo].[articulo] ([id], [descripcion], [stock], [uri], [estado], [idTipo], [idMarca], [modelo], [noSerie]) VALUES (9, N'Guitarra Lyon Negra', 0, N'./uploads/lyon-ln5.jpg', 1, 1, 2, N'LN-5', N'WSH-000-X212')
INSERT [dbo].[articulo] ([id], [descripcion], [stock], [uri], [estado], [idTipo], [idMarca], [modelo], [noSerie]) VALUES (10, N'Teclado Digital Yamaha ', 47, N'./uploads/psre343.jpg', 1, 3, 1, N'PSR-E343', N'PSR-343-FFFY')
INSERT [dbo].[articulo] ([id], [descripcion], [stock], [uri], [estado], [idTipo], [idMarca], [modelo], [noSerie]) VALUES (11, N'Guitarra Acústica de Maple', 24, N'./uploads/yamahaacu.jpg', 1, 2, 1, N'F354D', N'FDR-880-1222')
SET IDENTITY_INSERT [dbo].[articulo] OFF
GO
INSERT [dbo].[marca] ([id], [descripcion], [uri]) VALUES (1, N'Yamaha', N'./brands/yamaha.png')
INSERT [dbo].[marca] ([id], [descripcion], [uri]) VALUES (2, N'Washburn', N'./brands/washburn.png')
INSERT [dbo].[marca] ([id], [descripcion], [uri]) VALUES (3, N'KORG', N'./brands/korg.png')
INSERT [dbo].[marca] ([id], [descripcion], [uri]) VALUES (4, N'Ibanez', N'./brands/Ibanez.png')
GO
INSERT [dbo].[tipo] ([id], [descripcion], [icon]) VALUES (1, N'Guitarra Eléctrica', N'./img/electric.png')
INSERT [dbo].[tipo] ([id], [descripcion], [icon]) VALUES (2, N'Guitarra Acústica', N'./img/acoustic.png')
INSERT [dbo].[tipo] ([id], [descripcion], [icon]) VALUES (3, N'Piano de cola', N'./img/piano.png')
INSERT [dbo].[tipo] ([id], [descripcion], [icon]) VALUES (4, N'Accesorios', N'./img/accesories.png')
GO
SET IDENTITY_INSERT [dbo].[transaccion] ON 

INSERT [dbo].[transaccion] ([id], [fecha], [idArticulo], [tipo], [cantidad]) VALUES (4, CAST(N'2023-04-12' AS Date), 9, N'in', 3)
INSERT [dbo].[transaccion] ([id], [fecha], [idArticulo], [tipo], [cantidad]) VALUES (5, CAST(N'2023-04-12' AS Date), 10, N'in', 13)
INSERT [dbo].[transaccion] ([id], [fecha], [idArticulo], [tipo], [cantidad]) VALUES (6, CAST(N'2023-04-12' AS Date), 9, N'out', -110)
INSERT [dbo].[transaccion] ([id], [fecha], [idArticulo], [tipo], [cantidad]) VALUES (7, CAST(N'2023-04-12' AS Date), 10, N'out', 17)
SET IDENTITY_INSERT [dbo].[transaccion] OFF
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
ALTER TABLE [dbo].[transaccion]  WITH CHECK ADD FOREIGN KEY([idArticulo])
REFERENCES [dbo].[articulo] ([id])
GO
ALTER TABLE [dbo].[transaccion]  WITH CHECK ADD  CONSTRAINT [FK_articulo] FOREIGN KEY([idArticulo])
REFERENCES [dbo].[articulo] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[transaccion] CHECK CONSTRAINT [FK_articulo]
GO
