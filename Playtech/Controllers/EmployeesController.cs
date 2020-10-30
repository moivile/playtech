using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Playtech.Exceptions;
using Playtech.Models;

namespace Playtech.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        // GET: api/Employees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            var allEmployees = await _employeeService.GetAllEmployees();
            return allEmployees;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetEmployee(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }


        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest();
            }

            try
            {
                await _employeeService.UpdateEmployee(employee);
            }
            catch (NotFoundException e)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            employee = await _employeeService.CreateEmployee(employee);
            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            Employee deletedEmployee;
            try
            {
                deletedEmployee = await _employeeService.DeleteEmployee(id);
            }
            catch (NotFoundException e)
            {
                return NotFound();
            }

            return deletedEmployee;
        }
    }
}
