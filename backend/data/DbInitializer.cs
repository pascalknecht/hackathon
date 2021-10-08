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

			if (context.ParkingSpace.Any())
			{
				return;   // DB has been seeded
			}

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

		}
	}
}