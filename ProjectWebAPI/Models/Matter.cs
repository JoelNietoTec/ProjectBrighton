namespace ProjectWebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Matter
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public int Id { get; set; }

        public int ClientId { get; set; }

        public int AttorneyId { get; set; }

        public int MatterTypeId { get; set; }

        [StringLength(150)]
        public string Title { get; set; }

        [StringLength(10)]
        public string Description { get; set; }

        [Column(TypeName = "date")]
        public DateTime? OpeningDate { get; set; }

        [Column(TypeName = "money")]
        public decimal? AdvanceBalance { get; set; }

        public int StatusId { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModifyDate { get; set; }

        public virtual Client Client { get; set; }

        public virtual Employee Employee { get; set; }

        public virtual MatterType MatterType { get; set; }
    }
}
