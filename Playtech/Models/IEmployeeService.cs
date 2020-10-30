using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playtech.Models
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllEmployees();
        Task<Employee> GetEmployee(int id);
        Task UpdateEmployee(Employee employee);
        Task<Employee> CreateEmployee(Employee employee);
        Task<Employee> DeleteEmployee(int id);
    }
}
