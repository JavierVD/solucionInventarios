using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using solucionInventarios.Context;

namespace solucionInventarios.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionController : Controller
    {

        private ContextDb context;
        // GET: TransaccionController

        public TransaccionController(ContextDb context)
        {
            this.context = context;
        }
        public ActionResult Index()
        {
            return View();
        }
        // GET Stored procedure
        [Route("getInCount")]
        
        public ActionResult getInCount()
        {
            try
            {
                var temp = context.transaccion.Where(me => me.tipo == "in").Count();
                return Ok(temp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("getOutCount")]

        public ActionResult getOutCount()
        {
            try
            {
                var temp = context.transaccion.Where(me => me.tipo == "out").Count();
                return Ok(temp);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("getBestProduct")]
        public ActionResult getBestProduct()
        {
            try
            {
                var result = from a in context.articulo
                             where (from t in context.transaccion
                                    where t.tipo == "out"
                                    group t by t.idArticulo into g
                                    orderby g.Sum(x => x.cantidad) descending
                                    select g.Key).Take(1).Contains(a.id)
                             select new { a.id, a.descripcion };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET: TransaccionController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: TransaccionController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TransaccionController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: TransaccionController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: TransaccionController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: TransaccionController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: TransaccionController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
