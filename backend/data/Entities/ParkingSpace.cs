using System.Collections;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace data.Entities
{
	public enum ChargerType
	{
		None, Slow, Fast, TurboCharge
	}


	public class ParkingSpace
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ID { get; set; }
		public double Longitude { get; set; }
		public double Latitude { get; set; }
		public string Description { get; set; }
		public string Title { get; set; }
		public double PricePerHour { get; set; }

		[NotMapped]
		public string PricePerHourFormatted
		{
			get { return PricePerHour.ToString("f2"); }
		}

		public double PowerPricePerHour { get; set; }

		[NotMapped]
		public string PowerPricePerHourFormatted
		{
			get { return PowerPricePerHour.ToString("f2"); }
		}

		[NotMapped]
		public double TravelTime
		{
			get; set;
		}

		public ChargerType ChargerType { get; set; }
		public Owner Owner { get; set; }
		public virtual IEnumerable<Booking> Bookings { get; set; }

	}
}
