﻿using System.ComponentModel.DataAnnotations;

namespace solucionInventarios.Models
{
    public class Tipo
    {
        [Key]
        public int id { get; set; }
        public string descripcion { get; set; }
        public string icon { get; set; }
    }
}
