﻿using System.Web.Mvc;

namespace ProjectWebApplication.Areas.Configurations
{
    public class ConfigurationsAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Configurations";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Configurations_default",
                "Configurations/{controller}/{action}/{id}",
                new { area = "Configurations", controller = "Start",  action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}