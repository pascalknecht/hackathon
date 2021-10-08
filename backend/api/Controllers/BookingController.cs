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
	public class BookingController : ControllerBase
	{

		private readonly ILogger<BookingController> _logger;

		private readonly ParkingDbContext _context;

		public BookingController(ILogger<BookingController> logger, ParkingDbContext context)
		{
			_logger = logger;
			_context = context;
		}

		[HttpGet]
		public IEnumerable<Booking> Get()
		{
			return _context.Booking.ToList();
		}
	}
}
