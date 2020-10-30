using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Playtech.Models;

namespace Playtech.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly TestDBContext _context;

        public DepartmentService(TestDBContext context)
        {
            _context = context;
        }

        public async Task<List<Department>> GetAllDepartments()
        {
            return await _context.Department.OrderBy(x => x.Name).ToListAsync();
        }
    }
}
