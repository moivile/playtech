using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Playtech.Exceptions;
using Playtech.Models;

namespace Playtech.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly TestDBContext _context;

        public EmployeeService(TestDBContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllEmployees()
        {
            var result = await _context.Employee
                .OrderBy(x => x.Name)
                .Include(x => x.Department)
                .Include(x => x.Manager)
                .AsNoTracking()
                .ToListAsync();

            return result.Where(x => x.Manager != null).ToList();
        }

        public async Task<Employee> GetEmployee(int id)
        {
            return await _context.Employee
                .Include(x => x.Department)
                .Include(x => x.Manager)
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateEmployee(Employee employee)
        {

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(employee.Id))
                {
                    throw new NotFoundException();
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<Employee> CreateEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                throw new NotFoundException();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.Id == id);
        }
    }
}
