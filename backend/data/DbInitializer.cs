using data.Entities;
using System;
using System.Linq;

namespace data
{
	public static class DbInitializer
	{
		public static void Initialize(ParkingDbContext context)
		{
			context.Database.EnsureCreated();

			/*if (context.ParkingSpace.Any())
			{
				return;   // DB has been seeded
			}*/

			var owners = new Owner[]
			{
				new Owner{Name = "ewb"},
				new Owner{Name = "Stadt Bern"},
			};

			foreach (Owner s in owners)
			{
				context.Owner.Add(s);
			}
			context.SaveChanges();

			var users = new User[]
			{
				new User{Firstname = "Thomas", Lastname="Test"},
				new User{Firstname = "Tina", Lastname="Muster"},
			};

			foreach (User s in users)
			{
				context.User.Add(s);
			}
			context.SaveChanges();

			var parkingSpaces = new ParkingSpace[]
			{
				new ParkingSpace{Title = "Holligen Parkplatz EWB/BLS", Description = "Gedeckter Parkplatz in Ausserholligen", Longitude=7.4324089,Latitude=46.9448274,ChargerType=ChargerType.TurboCharge, PricePerHour = 4},
				new ParkingSpace{Title = "Parkplatz Wankdorf Nord", Description = "Offener Parkplatz im Norden des Wankdorf Stadiums. Verfügbar 24/7.", Longitude=7.4659712,Latitude=46.9622409,ChargerType=ChargerType.TurboCharge, PricePerHour = 4},
				new ParkingSpace{Title = "Europaplatz #1", Description = "Europaplatz", Longitude=7.408344,Latitude=46.943510,ChargerType=ChargerType.TurboCharge, PricePerHour = 4},
				new ParkingSpace{Title = "Europaplatz #2", Description = "Europaplatz", Longitude=7.407644,Latitude=46.944129,ChargerType=ChargerType.TurboCharge, PricePerHour = 4},
				new ParkingSpace{Title = "Europaplatz #3", Description = "Europaplatz", Longitude=7.408691,Latitude=46.942841,ChargerType=ChargerType.TurboCharge, PricePerHour = 4},
				new ParkingSpace{Title = "Europaplatz #4", Description = "Europaplatz", Longitude=7.409370,Latitude=46.943313,ChargerType=ChargerType.TurboCharge, PricePerHour = 4}
			};
			foreach (ParkingSpace s in parkingSpaces)
			{
				context.ParkingSpace.Add(s);
			}
			context.SaveChanges();

			var user = context.User.First();
			var parkingSpace = context.ParkingSpace.First();
			var bookings = new Booking[]
			{
				new Booking{BookingFrom = DateTime.Now, BookingTo = DateTime.Now, User = user, ParkingSpace = parkingSpace}
			};

			foreach (Booking s in bookings)
			{
				context.Booking.Add(s);
			}
			context.SaveChanges();

		}

	}
}