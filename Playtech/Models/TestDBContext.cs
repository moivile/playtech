using Microsoft.EntityFrameworkCore;

namespace Playtech.Models
{
    public partial class TestDBContext : DbContext
    {
        public TestDBContext()
        {
        }

        public TestDBContext(DbContextOptions<TestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Department>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");

                entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");

                entity.Property(e => e.ManagerId).HasColumnName("ManagerID");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.Property(e => e.Salary).HasColumnType("decimal(18, 2)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
