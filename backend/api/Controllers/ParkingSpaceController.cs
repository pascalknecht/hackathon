using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using data.Entities;
using data;
using HttpData;
using Microsoft.EntityFrameworkCore;

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
			var parkingSpaces = _context.ParkingSpace.Include(x => x.Bookings).ToList();

			foreach (var parkingSpace in parkingSpaces)
			{
				parkingSpace.PricePerHour = ExtremeCrazyDynamicPricingAlgorithm(parkingSpace);
			}
			return parkingSpaces;
		}

		[HttpGet]
		[Route("{id}")]
		public ParkingSpace Get(int id)
		{
			return _context.ParkingSpace.Where(x => x.ID == id).FirstOrDefault();
		}

		[HttpGet]
		[Route("availability")]
		public bool GetAvailability(AvailabilityInput input)
		{
			var parkingSpace = _context.ParkingSpace.Include(x => x.Bookings).Where(r => r.ID == input.ParkingSpaceID).FirstOrDefault();

			bool available = true;

			foreach (Booking b in parkingSpace.Bookings)
			{
				// Sorry for the bad code :-)
				if (b.BookingFrom <= input.BookingFrom && input.BookingFrom >= b.BookingTo)
				{
					available = false;
				}
				else if (b.BookingFrom <= input.BookingTo && input.BookingFrom >= b.BookingTo)
				{
					available = false;
				}

			}

			return available;

		}

		private double ExtremeCrazyDynamicPricingAlgorithm(ParkingSpace parkingSpace)
		{
			// This is a mock for the super fancy dynamic pricing that we will have in the future. ;-)
			Random random = new Random();

			var variance = ((parkingSpace.PricePerHour * 0.1) * random.NextDouble());
			var multiplicator = random.NextDouble() <= 0.5 ? -1 : 1;
			return parkingSpace.PricePerHour + (multiplicator * variance);

		}
	}
}
