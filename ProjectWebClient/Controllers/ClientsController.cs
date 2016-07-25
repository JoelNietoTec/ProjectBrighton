using Microsoft.AspNetCore.Mvc;


namespace ProjectWebClient.Controllers
{
    public class ClientsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult New()
        {
            return View();
        }
    }
}