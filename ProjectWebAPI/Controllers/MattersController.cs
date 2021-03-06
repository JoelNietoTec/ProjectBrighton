﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using ProjectWebAPI.Models;

namespace ProjectWebAPI.Controllers
{
    [EnableCors(origins: "http://localhost:28278, http://localhost:5000", headers: "*", methods: "*")]

    public class MattersController : ApiController
    {
        private ProjectDBEntities db = new ProjectDBEntities();

        // GET: api/Matters
        public IQueryable<Matter> GetMatters()
        {
            return db.Matters;
        }

        // GET: api/Matters/5
        [ResponseType(typeof(Matter))]
        public IHttpActionResult GetMatter(int id)
        {
            Matter matter = db.Matters.Find(id);
            if (matter == null)
            {
                return NotFound();
            }

            return Ok(matter);
        }

        // PUT: api/Matters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMatter(int id, Matter matter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matter.Id)
            {
                return BadRequest();
            }

            matter.ModifyDate = DateTime.Now;

            db.Entry(matter).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatterExists(id))
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

        // POST: api/Matters
        [ResponseType(typeof(Matter))]
        public IHttpActionResult PostMatter(Matter matter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            matter.CreateDate = DateTime.Now;

            db.Matters.Add(matter);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MatterExists(matter.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = matter.Id }, matter);
        }

        // DELETE: api/Matters/5
        [ResponseType(typeof(Matter))]
        public IHttpActionResult DeleteMatter(int id)
        {
            Matter matter = db.Matters.Find(id);
            if (matter == null)
            {
                return NotFound();
            }

            db.Matters.Remove(matter);
            db.SaveChanges();

            return Ok(matter);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatterExists(int id)
        {
            return db.Matters.Count(e => e.Id == id) > 0;
        }
    }
}