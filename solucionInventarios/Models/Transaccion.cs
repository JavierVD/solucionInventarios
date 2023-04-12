using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace solucionInventarios.Models
{
    public class Transaccion
    {
        [Key]
        public int id { get; set; }
        public string fecha { get; set; }
        public int cantidad { get; set; }
        public string tipo { get; set; }
        // Foreign key   
        [Display(Name = "Articulo")]
        public virtual int idArticulo { get; set; }

        [ForeignKey("idArticulo")]
        public virtual Articulo articulo { get; set; }
    }
}
