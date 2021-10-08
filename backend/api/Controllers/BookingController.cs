using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using data.Entities;
using data;
using Microsoft.EntityFrameworkCore;

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
			return _context.Booking
						.Include(x => x.User)
						.Include(x => x.ParkingSpace)
				.ToList();
		}

		[HttpPost]
		public async Task<IActionResult> Create(BookingDto bookingDto)
		{
			var booking = new Booking() {
				BookingFrom = bookingDto.bookingFrom,
				BookingTo = bookingDto.bookingTo,
				ParkingSpace = _context.ParkingSpace.Where(x => x.ID == bookingDto.parkingId).FirstOrDefault()
			};
			_context.Add(booking);
			await _context.SaveChangesAsync();
		}
	}

	public class BookingDto
	{
		public string bookingFrom {get;set;}
		public string bookingTo {get;set;}
		public string parkingId {get;set;}
	}
}
