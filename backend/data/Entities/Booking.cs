using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace data.Entities
{
	public class Booking
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int ID { get; set; }
		public double Price { get; set; }
		public DateTime BookingFrom { get; set; }
		public String BookingFromFormatted
		{
			get
			{
				return BookingFrom.ToString("dd.MM.yyyy HH:mm:ss");
			}
		}

		public DateTime BookingTo { get; set; }

		public String BookingToFormatted
		{
			get
			{
				return BookingTo.ToString("dd.MM.yyyy HH:mm:ss");
			}
		}
		public DateTime UsageFrom { get; set; }
		public DateTime UsageTo { get; set; }

		public ParkingSpace ParkingSpace { get; set; }

		public User User { get; set; }

	}
}
