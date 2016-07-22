using Microsoft.AspNetCore.Mvc;

namespace ProjectNetCore.Controllers
{
    public class EmployeesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult New()
        {
            return View();
        }
        public IActionResult Edit()
        {
            return View();
        }
    }
}