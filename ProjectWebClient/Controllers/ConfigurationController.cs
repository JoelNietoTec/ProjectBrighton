﻿using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectWebClient.Controllers
{
    public class ConfigurationController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {

            ViewData["Page"] = "Configuration";

            return View();
        }
    }
}
