using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProjectWebAPI.Models;
using System.Web.Http.Cors;

namespace ProjectWebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:28278, http://localhost:5000", headers: "*", methods: "*")]
    public class ClientContactsController : ApiController
    {
        private ClientsEntities db = new ClientsEntities();

        // GET: api/ClientContacts
        public IQueryable<ClientContact> GetClientContacts()
        {
            return db.ClientContacts;
        }

        // GET: api/ClientContacts/5
        [ResponseType(typeof(ClientContact))]
        public IHttpActionResult GetClientContact(int id)
        {
            ClientContact clientContact = db.ClientContacts.Find(id);
            if (clientContact == null)
            {
                return NotFound();
            }

            return Ok(clientContact);
        }

        //GET: api/ContactsByCLient/5
        [HttpGet]
        public IQueryable<ClientContact> GetContactsByClient(int client)
        {
            return db.ClientContacts.Where(e => e.ClientId == client);
        }

        // PUT: api/ClientContacts/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClientContact(int id, ClientContact clientContact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != clientContact.Id)
            {
                return BadRequest();
            }

            db.Entry(clientContact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ClientContacts
        [ResponseType(typeof(ClientContact))]
        public IHttpActionResult PostClientContact(ClientContact clientContact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ClientContacts.Add(clientContact);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = clientContact.Id }, clientContact);
        }

        // DELETE: api/ClientContacts/5
        [ResponseType(typeof(ClientContact))]
        public IHttpActionResult DeleteClientContact(int id)
        {
            ClientContact clientContact = db.ClientContacts.Find(id);
            if (clientContact == null)
            {
                return NotFound();
            }

            db.ClientContacts.Remove(clientContact);
            db.SaveChanges();

            return Ok(clientContact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientContactExists(int id)
        {
            return db.ClientContacts.Count(e => e.Id == id) > 0;
        }
    }
}