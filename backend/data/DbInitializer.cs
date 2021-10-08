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
				new ParkingSpace{Longitude=1,Latitude=1,ID=1},
			};
			foreach (ParkingSpace s in parkingSpaces)
			{
				context.ParkingSpace.Add(s);
			}
			context.SaveChanges();

		}
	}
}