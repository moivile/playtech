namespace Playtech.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal? Salary { get; set; }
        public int? DepartmentId { get; set; }
        public int? ManagerId { get; set; }
        public Department Department { get; set; }
        public Employee Manager { get; set; }

    }
}
