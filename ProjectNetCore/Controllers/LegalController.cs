using Microsoft.AspNetCore.Mvc;

namespace ProjectNetCore.Controllers
{
    public class LegalController : Controller
    {
        public IActionResult Index() {
            return View();
        }
    }
}