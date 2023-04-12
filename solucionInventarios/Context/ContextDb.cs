using Microsoft.EntityFrameworkCore;
using solucionInventarios.Models;

namespace solucionInventarios.Context
{
    public class ContextDb : DbContext
    {
        public ContextDb(DbContextOptions<ContextDb> options): base(options){
            
        }
        public DbSet<Articulo> articulo { get; set; }
        public DbSet<Transaccion> transaccion { get; set; }
        public DbSet<Tipo> tipo { get; set; }
        public DbSet<Marca> marca { get; set; }
    }
}
