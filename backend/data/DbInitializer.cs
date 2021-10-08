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
				new ParkingSpace{Longitude=7.405493,Latitude=46.942988,ChargerType=ChargerType.TurboCharge},
				new ParkingSpace{Longitude=7.407654,Latitude=46.943574,ChargerType=ChargerType.TurboCharge},
				new ParkingSpace{Longitude=7.408344,Latitude=46.943510,ChargerType=ChargerType.TurboCharge},
				new ParkingSpace{Longitude=7.407644,Latitude=46.944129,ChargerType=ChargerType.TurboCharge},
				new ParkingSpace{Longitude=7.408691,Latitude=46.942841,ChargerType=ChargerType.TurboCharge},
				new ParkingSpace{Longitude=7.409370,Latitude=46.943313,ChargerType=ChargerType.TurboCharge}
			};
			foreach (ParkingSpace s in parkingSpaces)
			{
				context.ParkingSpace.Add(s);
			}
			context.SaveChanges();

			var user = context.User.First();
			var parkingSpace = context.ParkingSpace.Single(r => r.ID == 1);
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