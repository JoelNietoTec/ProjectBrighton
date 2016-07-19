using Microsoft.AspNetCore.Mvc;

namespace ProjectNetCore.Controllers
{
    public class IndustriesController : Controller
    {
        public IActionResult Index() {
            return View();
        }
        public IActionResult New() {
            return View();
        }

        public IActionResult Edit() {
            return View();
        }
    }
}