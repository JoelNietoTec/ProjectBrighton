namespace ProjectWebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Client
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Client()
        {
            Matters = new HashSet<Matter>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; }

        [StringLength(200)]
        public string BillName { get; set; }

        public int ClientTypeId { get; set; }

        public int IndustryId { get; set; }

        public int AttorneyId { get; set; }

        [Column(TypeName = "ntext")]
        public string Notes { get; set; }

        public byte? Status { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? ModifyDate { get; set; }

        public virtual Employee Employee { get; set; }

        public virtual ClientType ClientType { get; set; }

        public virtual Industry Industry { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Matter> Matters { get; set; }
    }
}
