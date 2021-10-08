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
	public class OwnerController : ControllerBase
	{

		private readonly ILogger<OwnerController> _logger;

		private readonly ParkingDbContext _context;

		public OwnerController(ILogger<OwnerController> logger, ParkingDbContext context)
		{
			_logger = logger;
			_context = context;
		}

		[HttpGet]
		public IEnumerable<Owner> Get()
		{
			return _context.Owner.ToList();
		}
	}
}
