using Microsoft.AspNetCore.Mvc;

namespace ProjectNetCore.Controllers
{
    public class ConfigurationController : Controller
    {
        public IActionResult Index() {
            return View();
        }
    }
}

