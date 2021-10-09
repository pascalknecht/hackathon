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
			var parkingSpace = _context.ParkingSpace.Where(x => x.ID == bookingDto.parkingId).FirstOrDefault();
			var bookingFrom = DateTime.Parse(bookingDto.bookingFrom);
			var bookingTo = DateTime.Parse(bookingDto.bookingTo);
			var differenceInHours = (bookingTo - bookingFrom).TotalHours;

			var booking = new Booking()
			{
				BookingFrom = DateTime.Parse(bookingDto.bookingFrom),
				BookingTo = DateTime.Parse(bookingDto.bookingTo),
				Price = parkingSpace.PricePerHour * differenceInHours,
				ParkingSpace = parkingSpace
			};
			_context.Booking.Add(booking);
			_context.SaveChanges();
			return HttpStatusCode.Created;
		}
	}
}
