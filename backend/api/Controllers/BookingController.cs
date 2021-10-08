using System.Net;
using System.Runtime.Intrinsics.X86;
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
using HttpData;

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
		public HttpStatusCode Create(BookingInput bookingDto)
		{
			var booking = new Booking()
			{
				BookingFrom = DateTime.Parse(bookingDto.bookingFrom),
				BookingTo = DateTime.Parse(bookingDto.bookingTo),
				ParkingSpace = _context.ParkingSpace.Where(x => x.ID == bookingDto.parkingId).FirstOrDefault()
			};
			_context.Booking.Add(booking);
			_context.SaveChanges();
			return HttpStatusCode.Created;
		}
	}
}
