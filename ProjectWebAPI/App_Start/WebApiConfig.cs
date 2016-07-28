﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ProjectWebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web
            config.EnableCors();

            var json = config.Formatters.JsonFormatter.SerializerSettings;

            json.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            json.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;

            config.Formatters.Remove(config.Formatters.XmlFormatter);

            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ContactsByClient",
                routeTemplate: "api/ContactsByClient/{client}",
                defaults: new { controller = "ContactClients" }
            );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
