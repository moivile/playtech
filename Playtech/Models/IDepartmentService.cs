using System.Collections.Generic;
using System.Threading.Tasks;

namespace Playtech.Models
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAllDepartments();
    }
}
