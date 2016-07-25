namespace ProjectWebAPI.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Country
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(10)]
        public string ShortName { get; set; }

        [StringLength(100)]
        public string SpanishName { get; set; }
    }
}
