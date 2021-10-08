using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using data.Entities;
using data;

namespace api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class DashboardController : ControllerBase
	{

		private readonly ILogger<DashboardController> _logger;

		private readonly ParkingDbContext _context;

		public DashboardController(ILogger<DashboardController> logger, ParkingDbContext context)
		{
			_logger = logger;
			_context = context;
		}

		[HttpGet]
		public IEnumerable<Dashboard> Get()
		{
			return _context.Dashboard.ToList();
		}
	}
}
