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
		public DateTime BookingFrom { get; set; }
		public DateTime BookingTo { get; set; }
		public DateTime UsageFrom { get; set; }
		public DateTime UsageTo { get; set; }

		public ParkingSpace ParkingSpace { get; set; }

		public User User { get; set; }

	}
}
