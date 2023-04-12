using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace solucionInventarios.Models
{
    public class Articulo
    {
        [Key]
        public int id { get; set; }
        public string descripcion { get; set; }
        public int stock { get; set; }
        public string uri { get; set; }
        public bool estado { get; set; }
        // Foreign key   
        [Display(Name = "Tipo")]
        public virtual int idTipo { get; set; }

        [ForeignKey("idTipo")]
        public virtual Tipo tipo { get; set; }

        [Display(Name = "Marca")]
        public virtual int idMarca { get; set; }

        [ForeignKey("idMarca")]
        public virtual Marca marca { get; set; }

        public string noSerie { get; set; }
        public string modelo { get; set; }
    }
}
