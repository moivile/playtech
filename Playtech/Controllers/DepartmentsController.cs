using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Playtech.Models;

namespace Playtech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentsController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        // GET: api/Department
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetAllDepartments()
        {
            return await _departmentService.GetAllDepartments();
        }
    }
}
