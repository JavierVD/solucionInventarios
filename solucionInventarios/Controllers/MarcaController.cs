using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using solucionInventarios.Context;

namespace solucionInventarios.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class MarcaController : Controller
    {
        // GET: MarcaControlador
        private readonly ContextDb context;

        public MarcaController(ContextDb context)
        {
            this.context = context;
        }
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.marca.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

    // GET: MarcaControlador/Details/5
    public ActionResult Details(int id)
        {
            return View();
        }

        // GET: MarcaControlador/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: MarcaControlador/Create
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

        // GET: MarcaControlador/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: MarcaControlador/Edit/5
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

        // GET: MarcaControlador/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: MarcaControlador/Delete/5
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
