namespace ProjectWebAPI.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ClientsEntities : DbContext
    {
        public ClientsEntities()
            : base("name=LegalConn")
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<ClientType> ClientTypes { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        public virtual DbSet<Industry> Industries { get; set; }
        public virtual DbSet<Matter> Matters { get; set; }
        public virtual DbSet<MatterType> MatterTypes { get; set; }
        public virtual DbSet<Position> Positions { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasMany(e => e.Matters)
                .WithRequired(e => e.Client)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<ClientType>();

            modelBuilder.Entity<Employee>()
                .Property(e => e.HourRate)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Employee>()
                .Property(e => e.StartDate)
                .IsFixedLength();

            modelBuilder.Entity<Employee>()
                .HasMany(e => e.Clients)
                .WithRequired(e => e.Employee)
                .HasForeignKey(e => e.AttorneyId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Employee>()
                .HasMany(e => e.Matters)
                .WithRequired(e => e.Employee)
                .HasForeignKey(e => e.AttorneyId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Industry>();

            modelBuilder.Entity<Matter>()
                .Property(e => e.Description)
                .IsFixedLength();

            modelBuilder.Entity<Matter>()
                .Property(e => e.AdvanceBalance)
                .HasPrecision(19, 4);

            modelBuilder.Entity<MatterType>();

            modelBuilder.Entity<Position>();
        }
    }
}
