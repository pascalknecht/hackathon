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
	public class ParkingSpaceController : ControllerBase
	{

		private readonly ILogger<ParkingSpaceController> _logger;

		private readonly ParkingDbContext _context;

		public ParkingSpaceController(ILogger<ParkingSpaceController> logger, ParkingDbContext context)
		{
			_logger = logger;
			_context = context;
		}

		[HttpGet]
		public IEnumerable<ParkingSpace> Get()
		{
			return _context.ParkingSpace.ToList();
		}
	}
}
