using Microsoft.AspNetCore.Mvc;

namespace ProjectNetCore.Controllers
{
    public class PositionsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
