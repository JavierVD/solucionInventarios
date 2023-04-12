using System.ComponentModel.DataAnnotations;

namespace solucionInventarios.Models
{
    public class Marca
    {
        [Key]
        public int id { get; set; }
        public string descripcion { get; set; }
        public string uri { get; set; }
    }
}
