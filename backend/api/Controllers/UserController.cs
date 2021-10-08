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
	public class UserController : ControllerBase
	{

		private readonly ILogger<UserController> _logger;

		private readonly ParkingDbContext _context;

		public UserController(ILogger<UserController> logger, ParkingDbContext context)
		{
			_logger = logger;
			_context = context;
		}

		[HttpGet]
		public IEnumerable<User> Get()
		{
			return _context.User.ToList();
		}
	}
}
