using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using solucionInventarios.Context;
using solucionInventarios.Models;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace solucionInventarios.Controllers
{
    
    public class Value
    {
        public string value { get; set; }
    }

    public class NewArticle
    {
        public int id { get; set; }
        public string descripcion { get; set; }
        public int stock { get; set; }
        public IFormFile imagen { get; set; }
        public string noSerie { get; set; }
        public int idMarca { get; set; }
        public int idTipo { get; set; }
        public string modelo { get; set; }
    }

    public class UpdateStock
    {
        public int newStock { get; set; }
    }

    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ArticuloController : ControllerBase
    {
        private readonly ContextDb context;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public ArticuloController(ContextDb context, IWebHostEnvironment hostingEnvironment)
        {
            this.context = context;
            _hostingEnvironment = hostingEnvironment;
        }
        // GET: api/<ArticuloController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {   
                var articulos = context.articulo.Where(a => a.estado);
                return Ok(articulos);
            }catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }


        // GET api/<ArticuloController>/5
        [HttpGet("{id}", Name = "getArticulo")]
        public ActionResult Get(int id)
        {
            try
            {
                var temp = context.articulo.FirstOrDefault(g => g.id == id);
                return Ok(temp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get search by name or id

        [Route("getLastId")]

        public ActionResult getLastId()
        {
            try
            {
                var maxId = context.articulo.Max(a => a.id);
                return Ok(maxId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("getCatalog")]

        public ActionResult getCatalog()
        {
            try
            {
                var query = (from a in context.articulo
                             join m in context.marca on a.idMarca equals m.id
                             join t in context.tipo on a.idTipo equals t.id
                             where a.estado == true
                             select new
                             {
                                 id = a.id,
                                 descripcion = a.descripcion,
                                 stock = a.stock,
                                 uri = a.uri,
                                 idTipo = a.idTipo,
                                 idMarca = a.idMarca,
                                 noSerie = a.noSerie,
                                 estado = a.estado,
                                 brand = m.descripcion,
                                 imgBrand = m.uri,
                                 icon = t.icon
                             }).ToList();
                return Ok(query);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get search by name or id

        [Route("searchArticle")]
        [HttpPost]
        public ActionResult searchArticle([FromBody] Value value)
        {
            try
            {
                var resultados = context.articulo.Where(a => a.id.ToString() == value.value || a.descripcion.Contains(value.value));
                return Ok(resultados);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + value);
            }
        }

        [Route("addArticle")]
        [HttpPost]
        public async Task<ActionResult> Metodo([FromForm] NewArticle newArticle)
        {
            try
            {
                var filePath = "./img/foto.png";
                if (newArticle != null && newArticle.imagen.Length > 0)
                {
                    var fileName = Path.GetFileName(newArticle.imagen.FileName);
                    filePath = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp/public/uploads/", fileName);
                    using (var fileSrteam = new FileStream(filePath, FileMode.Create))
                    {
                        await newArticle.imagen.CopyToAsync(fileSrteam);
                    }
                    filePath = "./uploads/" + fileName;
  
                }
                Articulo articulo = new Articulo();
                //articulo.id = newArticle.id;
                articulo.descripcion = newArticle.descripcion;
                articulo.stock = newArticle.stock;
                articulo.uri = filePath;
                articulo.estado = true;
                articulo.idMarca = newArticle.idMarca;
                articulo.noSerie = newArticle.noSerie; 
                articulo.idTipo = newArticle.idTipo;
                articulo.modelo = newArticle.modelo;

                context.articulo.Add(articulo);
                context.SaveChanges();
                return CreatedAtRoute("getArticulo", new { id = articulo.id }, articulo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }


        }

        // POST api/<ArticuloController>
        [HttpPost]
        public ActionResult Post([FromBody] Articulo articulo)
        {
            try
            {
                context.articulo.Add(articulo);
                context.SaveChanges();
                return CreatedAtRoute("getArticulo", new { id = articulo.id }, articulo);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ArticuloController>/5
        [HttpPut("{id}/stock")]
        public ActionResult updateStockPut(int id, [FromBody] UpdateStock updateStock)
        {
            try
            {
                var article = context.articulo.FirstOrDefault(u => u.id == id);

                if (article == null)
                {
                    return NotFound();
                }

                article.stock = article.stock + updateStock.newStock;
                context.SaveChanges();

                Transaccion transaccion = new Transaccion();
                transaccion.idArticulo = id;
                transaccion.cantidad = (updateStock.newStock >= 0) ? updateStock.newStock: updateStock.newStock *-1;
                transaccion.fecha = DateTime.Now.ToString("yyyy/MM/dd");
                transaccion.tipo = (updateStock.newStock >= 0) ? "in" : "out";
                context.transaccion.Add(transaccion);
                context.SaveChanges();

                return Ok(transaccion);

            }
            catch(Exception ex)
            {
                return BadRequest(ex);
            }
        }

        // DELETE api/<ArticuloController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var articulo = context.articulo.FirstOrDefault(g => g.id == id);
                if(articulo != null)
                {
                    context.articulo.Remove(articulo);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
