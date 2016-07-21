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
    public class MatterTypesController : ApiController
    {
        private ClientsEntities db = new ClientsEntities();

        // GET: api/MatterTypes
        public IQueryable<MatterType> GetMatterTypes()
        {
            return db.MatterTypes;
        }

        // GET: api/MatterTypes/5
        [ResponseType(typeof(MatterType))]
        public IHttpActionResult GetMatterType(int id)
        {
            MatterType matterType = db.MatterTypes.Find(id);
            if (matterType == null)
            {
                return NotFound();
            }

            return Ok(matterType);
        }

        // PUT: api/MatterTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMatterType(int id, MatterType matterType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matterType.Id)
            {
                return BadRequest();
            }

            matterType.ModifyDate = DateTime.Now; //Se ajusta la fecha de modificación del elemento

            db.Entry(matterType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatterTypeExists(id))
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

        // POST: api/MatterTypes
        [ResponseType(typeof(MatterType))]
        public IHttpActionResult PostMatterType(MatterType matterType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            matterType.CreateDate = DateTime.Now; // Se ajusta la fecha de creación del elemento

            db.MatterTypes.Add(matterType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = matterType.Id }, matterType);
        }

        // DELETE: api/MatterTypes/5
        [ResponseType(typeof(MatterType))]
        public IHttpActionResult DeleteMatterType(int id)
        {
            MatterType matterType = db.MatterTypes.Find(id);
            if (matterType == null)
            {
                return NotFound();
            }

            db.MatterTypes.Remove(matterType);
            db.SaveChanges();

            return Ok(matterType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatterTypeExists(int id)
        {
            return db.MatterTypes.Count(e => e.Id == id) > 0;
        }
    }
}