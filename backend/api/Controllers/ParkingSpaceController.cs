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
				parkingSpace.PricePerHour = ExtremeCrazyDynamicPricingAlgorithm(parkingSpace.PricePerHour);
				parkingSpace.PowerPricePerHour = ExtremeCrazyDynamicPricingAlgorithm(parkingSpace.PowerPricePerHour);
			}
			return parkingSpaces;
		}

		[HttpPost]
		[Route("{id}")]
		public ParkingSpace Get(int id, Location location)
		{
			var parkingSpace = _context.ParkingSpace.Where(x => x.ID == id).FirstOrDefault();
			var sCoord = new Location(parkingSpace.Latitude, parkingSpace.Longitude);

			parkingSpace.TravelTime = Math.Round((CalculateDistance(sCoord, location) / 5500 / 60));

			return parkingSpace;
		}

		[HttpGet]
		[Route("nearest")]
		public IdOutput GetNearestParkingSpace(double longitude, double latitude)
		{
			var parkingSpaces = _context.ParkingSpace.ToList();
			ParkingSpace parkingSpaceNearest = new ParkingSpace();
			double distance = Double.MaxValue;

			foreach (var parkingSpace in parkingSpaces)
			{
				var sCoord = new Location(parkingSpace.Latitude, parkingSpace.Longitude);
				var eCoord = new Location(latitude, longitude);

				var distanceCurrent = CalculateDistance(sCoord, eCoord);
				Console.WriteLine("distance: {0}, parkingSpace: {1}", distanceCurrent, parkingSpace.Title);

				if (distanceCurrent < distance)
				{
					distance = distanceCurrent;
					parkingSpaceNearest = parkingSpace;
				}
			}

			return new IdOutput() { id = parkingSpaceNearest.ID };
		}


		[HttpPost]
		[Route("{id}/availability")]
		public bool GetAvailability(int id, AvailabilityInput input)
		{
			var parkingSpace = _context.ParkingSpace.Include(x => x.Bookings).Where(r => r.ID == id).FirstOrDefault();

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

		private double ExtremeCrazyDynamicPricingAlgorithm(double price)
		{
			// This is a mock for the super fancy dynamic pricing that we will have in the future. ;-)
			Random random = new Random();

			var variance = ((price * 0.1) * random.NextDouble());
			var multiplicator = random.NextDouble() <= 0.5 ? -1 : 1;
			var value = price + (multiplicator * variance);
			return Math.Round(value * 20, MidpointRounding.AwayFromZero) / 20;

		}


		// Stolen from stackoverflow.. sorry :-P https://stackoverflow.com/questions/60700865/find-distance-between-2-coordinates-in-net-core
		private double CalculateDistance(Location point1, Location point2)
		{
			var d1 = point1.Latitude * (Math.PI / 180.0);
			var num1 = point1.Longitude * (Math.PI / 180.0);
			var d2 = point2.Latitude * (Math.PI / 180.0);
			var num2 = point2.Longitude * (Math.PI / 180.0) - num1;
			var d3 = Math.Pow(Math.Sin((d2 - d1) / 2.0), 2.0) +
					 Math.Cos(d1) * Math.Cos(d2) * Math.Pow(Math.Sin(num2 / 2.0), 2.0);
			return 6376500.0 * (2.0 * Math.Atan2(Math.Sqrt(d3), Math.Sqrt(1.0 - d3)));
		}
	}
}
