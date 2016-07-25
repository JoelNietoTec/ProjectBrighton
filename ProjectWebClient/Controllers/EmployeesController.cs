using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectWebClient.Controllers
{
    public class EmployeesController : Controller
    {
        // GET: /<controller>/
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
